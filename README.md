
Changes from Daniel 4/20/2026:
change endpoint from getAllRooms to getCreatedAndJoinedRoomsByUserId/{id}

Created endpoint to get user based on userId saved
the function name: getUserByUserId(id: number)

Bugs List:
Lets Change the logic where inviting users to rooms list should EXCLUDE the HOST of the room and current User Members!

Notes for rooms page when user enters a specific room:
    Within the main card, display the host user's name and Icon within the top card!

    WHen clicking on invite members, the list SHOuld not display users who already joined room or is Hosting the room: (Daniel might need to create an endpoint to return users who hasn't joined the room or isn't hosting the room)

    Adjust the ROom Info card:
        Change "Created By User" from the user id to the username

    display availability of course ([JD] availability now shows up for each user in the room.)


8/31/2026 Daniel H. :updating API link to my new hosted API redone based on what I've learned from the academy and internship as a whole
This API is still in development but now has funtionality towards most of our core features other than User's Availability!
    I will get Availability function operational before end of this week!

9/18/2026 Daniel H: This fullstack app is fully operational based on working functions implemented at the academy with the addition of adding the host's availability within the rooms page for all members to view! Here are some features I would like to add towards this full stack web app

Implement functionality for the host user to select the golden hour and display selected golden hour in dashboard and rooms page. 
Fix availablility to be mapped better within Mobile versions.
Within Friends page, fix list to exclude accepted friends/pending friends!
Look into a way to implement notifications when golden hours are selected when user log in! (Websockets or Socket.Io)


## Hosted Link!
https://venn-iota.vercel.app/

### Figma Link!
https://www.figma.com/make/kz8Ceo6cvDNZFGNHHTGOss/Social-Scheduling-App-Prototype?p=f&t=2XjEYw2IrkaZMYpH-0

Fix bug where user is unable to create a room.
Add a feature to toggle from Am to Pm when viewing the rooms page!
