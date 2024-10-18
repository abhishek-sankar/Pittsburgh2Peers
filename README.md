# Pittsburgh 2 Peers

# [Demo](https://pittsburgh2peers.vercel.app/)
# [Pre recorded demo](https://drive.google.com/file/d/1s66ymQwJZS2dXAcxsINda0tIlEeZwTeS/view?usp=drive_link)

### Motivation

So a lot of us would be landing shortly in Pitt. We wanted to create something to sort out a lot of the logistics of getting settled in.

- Help coordinate students arriving in time buckets to share costs of hailing a ride.
- Getting a ride from the airport to your stay close to campus.
- We're also adding a service to help get a uhaul (and a driver) whilst you arrive on campus.
- We are out of MVP.

### Current status

- We have the flows for requesting a ride, requesting a UHaul and connecting with students who arrive in the same timeslot.
- We need to authenticate via a google service. Currently, since we'd use this for CMU, we have enabled `andrew.cmu.edu` as the only allowed organization but you can swap out the google client id in the env file for your requirements.
- If forking, you would have to create a Google auth service that allows your college based emails to authenticate.

<!-- ![Landing Page](public/landing-page.png) -->
