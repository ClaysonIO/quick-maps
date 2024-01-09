import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import netlifyIdentity from "netlify-identity-widget";
import {IUser} from "../../netlify/functions/add-users.ts";
import {useMemo} from "react";

export function useUsers() {
    const queryClient = useQueryClient();

    const {data = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            await netlifyIdentity?.refresh()
            const response = await fetch('/.netlify/functions/get-users', {
                headers: {
                    Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                }
            });
            if (response.status === 401) {
                throw new Error("401")
            }
            if (!response.ok) throw new Error(response.statusText)
            return (await response.json() ?? {}) as IUser[];
        },
        placeholderData: []
    })

    const setUsersMutation = useMutation({
        mutationFn: async ({action, user}: {action: 'delete' | 'patch',  user: IUser }) => {
            await netlifyIdentity?.refresh()

            let response: Response | undefined = undefined;
            if (action === 'delete') {
                response = await fetch('/.netlify/functions/delete-user', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                    }
                });
            } else if (action === 'patch') {
                response = await fetch('/.netlify/functions/patch-user', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
                    }
                });
            }
            if (response?.status === 401) {
                throw new Error("401")
            }
            if (!response?.ok) throw new Error(response?.statusText)
            return response?.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })

    const isAdmin = useMemo(()=>{
        return data.some(user=>user.email === netlifyIdentity.currentUser()?.email && user.isAdmin)
    }, [])

    return {data, setUsersMutation, isAdmin}
}