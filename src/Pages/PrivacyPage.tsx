export function PrivacyPage(){
    return (<main style={{padding: '2em', maxWidth: '800px', margin: 'auto'}}>
        <h1>Visit Tracker Privacy Policy</h1>

        <p>Visit Tracker is a web application that allows users to create and manage a database of addresses and visits. It was originally developed to help me coordinate visits to members of my church congregation, then abstracted to be useful to anyone who needs to visit a large number of addresses.</p>

        <p>The application allows you to log in with your Google account, and stores all of your data in a Google sheet
            controlled by you, or the person who invited you. By design, I do not have any access to your data beyond
            the bare minimum required to operate this tool</p>

        <p>This application does track the total number of unique users accessing it, but does not collect any
            information beyond that number.</p>

        <p>If you have any questions, please contact me at <a href="mailto:visit-tracker@clayson.io">visit-tracker@clayon.io</a></p>
    </main>)
}