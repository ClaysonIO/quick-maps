import netlifyIdentity from "netlify-identity-widget";

export function LoginPage(){
    return <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1>Login</h1>
        <button onClick={()=>netlifyIdentity.open()}>Login</button>
    </div>
}