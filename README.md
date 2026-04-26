
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

    display availability of course


## Hosted Link!
https://venn-iota.vercel.app/

### Figma Link!
https://www.figma.com/make/kz8Ceo6cvDNZFGNHHTGOss/Social-Scheduling-App-Prototype?p=f&t=2XjEYw2IrkaZMYpH-0

