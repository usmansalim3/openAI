
# openAI E-Wallet

An application that uses openAI technology to generate images based on given prompt along with chat bot similar to chatGPT and an integrated E-WALLET to transfer Ethereum.




## Features
- Full stack app with JWT authentication along with OTP verification using Twilio.
- Save and share the image generated on directly on various social media platforms.
- Ask any question to the chatBot based on openAI's api.
- Chats are saved across all the devices on database.
- Connect your metamask/e-wallet and transfer ethereum and check balance
- Go through all the transactions made.



## Tech Stack

**Client:** React-Native, Expo, Ether.js

**Styling:** React-Native-Paper

**State Management:** ReduxToolkit

**Server:** Node, Express, Twilio (sending txt to phone numbers)


## Roadmap

- Add other currencies apart from Ethereum
- Connect multiple wallets
- Ability to save more than 3 images (storage limitation due to images being saved in base64 format on mongoDB)
- Handling edge cases when images are unliked.
- On giving complex prompt the image generator might take a lot of time to generate an image hence giving the option to abort the process to the user.


## Lessons Learned

- Building a full stack app , flow of authentication with JWT.
- Managing state with  ReduxToolkit from handling authentication to all the       requests made to Express server using async thunks.
- Mounting unmounting event listeners to disable back navigation without preventing behavior of react navigation
- Building responsive UI
- Lottie animations

## Screenshots


![s1](https://github.com/usmansalim3/openAI/assets/112751010/ac164994-68e0-4619-a84b-718ab8c134ed)
![s2](https://github.com/usmansalim3/openAI/assets/112751010/db3c3c5d-5600-4fe0-a089-cc23eed8b9ff)




## Demo

https://user-images.githubusercontent.com/112751010/231463328-011f05b1-42c5-44f2-94d2-92ba122830de.mp4

https://user-images.githubusercontent.com/112751010/231463576-9dfad487-b1b7-4a56-9834-9b3872b5aebe.mp4

https://user-images.githubusercontent.com/112751010/231463660-a1d6c8aa-e322-4410-88cb-cf66e4e065c8.mp4

https://user-images.githubusercontent.com/112751010/231463706-af329fdc-5bf4-4585-95c2-50050aeac5a0.mp4

https://user-images.githubusercontent.com/112751010/231480447-d8430b09-fed1-4e6f-998d-897fbbc0b512.mp4



