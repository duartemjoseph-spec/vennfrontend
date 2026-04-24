
Changes from Daniel 4/20/2026:
change endpoint from getAllRooms to getCreatedAndJoinedRoomsByUserId/{id}

Created endpoint to get user based on userId saved
the function name: getUserByUserId(id: number)

Bugs List:
When Event Date is created, it is saved and displayed in UTC Time, EX: I create an event at 4/25 at 8:00pm and displays event date at 4/26 at 3:00 AM
Bug where availability status is getting saved improperly:

## Hosted Link!
https://venn-iota.vercel.app/

### Figma Link!
https://www.figma.com/make/kz8Ceo6cvDNZFGNHHTGOss/Social-Scheduling-App-Prototype?p=f&t=2XjEYw2IrkaZMYpH-0

