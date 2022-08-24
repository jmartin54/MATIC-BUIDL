# MATIC-BUIDL

Submission for the MATIC BUIDL hackathon

Deployed to the mumbai testnet at: 0x854F5B53ce5960e1c9485BdEE2fa72062d2b06Ea

**TOC**
— Submission overview (idea, progress, vision)
— The road ahead (1m, 3m, how I'd use $50k)
— Folders (pixel-demo, pixel, onboarding-v3, spaghetti)

# Submission Overview

**Idea:**

The idea is to onboard a large number of users to MATIC by letting them create an NFT together. Each user can buy specific pixels in a million pixel image. Then they can paint these pixels. Together they make one big community-created NFT.

**Progress:**
The project is currently a collection of repos, because I ran out of time. All the major pieces of what I need are there, but I'm still pulling it all together. That's just kind of how my creative process works.

**Vision:**
I want to onboard 1M new crypto users. Specifically, people who think NFTs are just dumb JPGs. I want to show them that NFTs can give them control over pixels, autonomous systems, and even their local commons (in the economic sense).

# The Road Ahead

**One Month Goals:**
I'm still actively working on this project (though not necessarily in this repo). I'm treating it like a startup. (I've been a founder before).
— Deploy OpenSea compatible NFTs to polygon mainnet, sell the first 100
_I can do this anytime, I'm just waiting until I finalize the public brand/messaging_
— Build a waitlist for demand past 100
— Go through another round of UX interviews on the landing page
— Talk to 500 people in person about the project
— Connect the landing, zoomed-in, full-image, and waitlist pages in a single site

**Three Month Goals:**
— Put together a list of 100 crypto/tech journalists
— Write a press-release/pitch, and contact all 100
— Talk to another 1k people
— Sell the first 5,000 NFTs

**How I'd use $50k:**
— $1k for Delaware llc and other incorporation costs
— $10k for servers + gas
— $5k for 3D design. I have some great designers in mind.
— $5k for landing page funnel + gamified waitlist
— $25k for marketing/growth
— $4k 3m rent + food

The majority is for user acquisition and server costs.

I can get the 3D design and waitlist for so cheap because I can do most of the work myself. I just want to bring in people better than me to take it from okay to amazing.

I want the landing page to be similar to this:
https://www.spaceandtime.io

I just need someone to put together the materials and lighting. I can write all the code.

# Folder structure

**pixel-demo:**
This folder is a working demo of the smart contracts. It's deployed on polygon.

_This version doesn't have a very robust events system, so it can get out of sync. If you refresh the page, you'll see the updates.
I have another project where I fixed this problem, I just need to add the solution to Pixel._

**pixel:**
This folder is a simple landing page, with 3D elements and a whitelist signup.

_I've used it to get a sense of how people understand, and respond to, the overall idea._

**landing-v3:**
This folder is a step-by-step walkthrough of the idea. I've gotten much better feedback on the UX of this page. A lot of people that otherwise don't understand NFTs see the value in controlling a billboard in the real world.

**My stack:**
I put smart contracts into an evm folder. I've mostly used truffle, but switched to hardhat when some deploy scripts failed to work on the mumbai test net.

I put the react projects into a frontend folder.

The 3D elements are ThreeJs with custom shaders in some places.

**Spaghetti**
These repos act like scratch paper for me to rapidly test ideas with users and make sure things are working. They are messy in places. There is unused code in others. I don't mind this because it allows me to get feedback without feeling attached to my codebase.

When I pull the codebases together I'll follow more normal design patterns.
_But if no one ever uses your product, your code doesn't matter.. First things first._
