## ð¡ Inspiration
We wanted to send secret messages without ringing bells! I didnât want spies to know that I was secretly communicating! Hence, we devised a way to send secret messages without anyone ever suspecting it!

## Introducing Shark Encrypt ð
Shark Encrypt helps you create truly encrypted messages with multi-factor authentication. ð

## ð What it does
### For encrypting a secret message ð :
- It will create a shark for you to hold all your secrets! ð¦
- You can select a name for your shark.
- You can enter your secret message and a secret key. ð¤«
- Your shark will encrypt your message with the given key and return to you: a shark image. ð¼ï¸ð¦
- You will need this shark image later to decrypt your secret message!
- Your shark now holds all your secrets!!

### For decrypting a secret message ð :
- Identify your shark by its name & upload your shark image with its secret key.
- The shark will check whether the name, image, and key you entered are correct or not.
- If everything checks out to be correct, you will be shown the secret message! â
- Else, the shark will eat you, you imposter! â
- It performs integrity and authorization checks using the provided key and image while decrypting your secret shark image.

## âï¸ How we built it
We leveraged many tools and APIs to build this app.
- The front end of the app is built using React. âï¸
- The encryption & decryption APIs are built using Node and Express. This API is hosted on Heroku.
- The encryption logs are stored in a MySQL database which is hosted on PlanetScale. ð¾
- We used Stable Diffusion for AI Shark Image Generation. We availed the API from Replicate.com to use Stable Diffusion. ð¼ï¸
- We used bcrypt and sjcl libraries for cryptography operations. ð¢
