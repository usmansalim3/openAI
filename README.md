
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


![WhatsApp Image 2023-04-03 at 4 08 49 PM](https://user-images.githubusercontent.com/112751010/231464695-c4f9e570-3419-4bc4-b38d-9ece55fa64a3.jpeg)
![Screenshot_2023-04-12-19-14-50-066_host exp exponent](https://user-images.githubusercontent.com/112751010/231480096-4e63cb9f-8734-4b88-b060-5136f43b3337.jpg)
![WhatsApp Image 2023-04-03 at 4 08 54 PM](https://user-images.githubusercontent.com/112751010/231464699-153e9845-1ad0-4482-a218-53c148465caf.jpeg)
![WhatsApp Image 2023-04-03 at 4 09 01 PM](https://user-images.githubusercontent.com/112751010/231464708-5bf5203e-af22-48ef-a866-b346f49586be.jpeg)
![WhatsApp Image 2023-04-03 at 4 09 13 PM](https://user-images.githubusercontent.com/112751010/231464712-40f34411-6590-4e86-9cc3-2ca51e302d3a.jpeg)





## Demo

https://user-images.githubusercontent.com/112751010/231463328-011f05b1-42c5-44f2-94d2-92ba122830de.mp4

https://user-images.githubusercontent.com/112751010/231463576-9dfad487-b1b7-4a56-9834-9b3872b5aebe.mp4

https://user-images.githubusercontent.com/112751010/231463660-a1d6c8aa-e322-4410-88cb-cf66e4e065c8.mp4

https://user-images.githubusercontent.com/112751010/231463706-af329fdc-5bf4-4585-95c2-50050aeac5a0.mp4

https://user-images.githubusercontent.com/112751010/231480447-d8430b09-fed1-4e6f-998d-897fbbc0b512.mp4



