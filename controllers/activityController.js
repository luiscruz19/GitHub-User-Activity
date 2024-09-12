export async function viewActivity(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                'User-Agent': 'github-activity-cli',
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const events = await response.json();
        return events;
    } catch (error) {
        throw new Error(error.message);
    }
}
