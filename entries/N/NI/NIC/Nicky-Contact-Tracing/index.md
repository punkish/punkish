---
title      : On Nicky’s Contact Tracing Proposal
description: 
modified   : 2020-04-11 09:22:00
created    : 2020-04-11 09:22:00
viewcount  : 0
id         : 
gmap       : 
tags        :
    - Nicky Case
    - Contact Tracing
    - COVID-19
    - Covid19
stars      : 
---

There is not much to add to [Nicky’s most excellent explanation](https://ncase.me/contact-tracing/) of a privacy-protecting yet effective contact-tracing app. That said, I find the following diagram to add to the original, wonderful illustrations and text.

```
                                                              
             Alice                   Bob                      
                                                              
═══╦══════╦════════════════════════════════════════════════   
   │day 0 │  gets infected                                    
───┼──────┼────────────────────────────────────────────────   
   │day 1 │                                                   
───┼──────┼────────────────────────────────────────────────   
   │day 2 │                                                   
───┼──────┼────────────────────────────────────────────────   
   │day 3 │  becomes contagious  - come in contact w Alice    
   │      │                      - gets infected              
 ──┼──────┼─────────────────────────────────────────────────  
   │day 4 │                                                   
 ──┼──────┼─────────────────────────────────────────────────  
   │      │  - shows symptoms   - phone automatically         
   │      │  - gets tested        determines he came in         
   │day 5 │  - confirmed pos.     contact with someone          
   │      │  - uploads data       who was infected              
   │      │                     - self-quarantines            
 ──┼──────┼─────────────────────────────────────────────────  
   │day 6 │                     X chain is broken             
 ──┼──────┼─────────────────────────────────────────────────  
   │day 7 │                                                   
 ──┼──────┼─────────────────────────────────────────────────  
   │      │                     - shows symptoms              
   │day 8 │                     - gets tested                 
   │      │                     - confirmed neg.              
   │      │                     - no need to upload data      
 ──┴──────┴─────────────────────────────────────────────────  
 ```

 Note that the above lies on a few assumptions and a lot of voluntary actions. Here are a few I can think of:

- Is there any voluntary action anywhere?
1. yes, on the part of Alice and Bob, to install that app allow it to do its job, which is to send out the random codes every 5 mins, and to poll the central db for matching codes (this becomes useful in step four below
2. yes, on the part of Alice to get tested as soon as she shows symptoms
3. yes, on the part of Alice to upload her data anonymously to the central db
4. yes, on the part of Alice and Bob to let their app check the central db for matching codes

- Does the model depend on Alice voluntarily sending all the sent-received-messages to the hospital or does this happen automatically?
1. Alice has upload her data to the central db once she knows she is infected, which happens once she is tested, which happens once she shows symptoms. More on this below.

- Who asserts that Alice is infected?
1. Alice gets tested as soon as she shows symptoms. More on this below.

Here is more — All of the above assumes the following:

**cooperation:** download the app and let it do its thing  
**education:** everyone knows about the app, how to download and install it properly and let it do its thing, what the symptoms, and who to call soon as symptoms are visible  
**availability of testing:** naturally, this is a prerequisite