---
title      : Blockchains in Health
description: 
modified   : 2018-10-01 12:00:00
created    : 2018-10-01 12:00:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - presentation
    - health
    - governance
    - privacy
    - security
stars      : 
where      : University of Vienna
when       : Nov 21, 2017
notes      : A blockchain primer
hidden     : vienna
---

## One Way Hash

<iframe src="/entry-files/B/BL/BLO/Blockchains-in-Health/s1.html"></iframe>

---

## Linked List

A data structure consisting of a collection of nodes which together represent a sequence. In its most basic form, each node contains: data, and a reference (in other words, a link) to the next node in the sequence.

<img class="remark"  src="/entry-files/B/BL/BLO/Blockchains-in-Health/img/linked-list.png">

---

## Linked List in JavaScript

```
let list = [
    {
        index: 0,
        timestamp: new Data(),
        data: 'some data',
        next: 1
    },
    {
        index: 1,
        timestamp: new Data(),
        data: 'some more data',
        next: 2
    },
    {
        index: 2,
        timestamp: new Data(),
        data: 'different data',
        next: ?
    },
]
```

---

## Blockchain

A linked list in which every link (except the first one) is linked to the previous link via a hash function

<img class="remark"  src="/entry-files/B/BL/BLO/Blockchains-in-Health/img/linked-list.png">

---

## Blockchain in JavaScript

A linked list in which every link (except the first one) is linked to the previous link via a hash function

```
let blockchain = [{
        index: 0,
        timestamp: new Date(),
        data: 'some data',
        prevHash: null,
        thisHash: thisHash
    }, {
        index: 1,
        timestamp: new Date(),
        data: 'some more data',
        bp: '120/80',
        prevHash: this[0]['thisHash']
        thisHash: thisHash
    }, {
        index: 2,
        timestamp: new Date(),
        data: 'different data',
        prevHash: hash(1)
        thisHash: thisHash
    },
]
```

---

## Proof of Work

A Proof-of-Work (PoW) system (or protocol, or function) is an economic measure to deter denial of service attacks and other service abuses such as spam on a network by requiring some work from the service requester, usually meaning processing time by a computer.

https://en.wikipedia.org/wiki/Proof-of-work_system

---

Google’s definition of “blockchain” is “a digital ledger in which transactions made in bitcoin or another cryptocurrency are recorded chronologically and publicly.” While most people would agree that a blockchain is a digital ledger, many blockchains do not have an associated cryptocurrency and are not recorded publicly. Some would even argue that a blockchain needn’t be digital.

---

Investopedia says, “A blockchain is a digitized, decentralized, public ledger of all cryptocurrency transactions.” Again, many blockchains are not public, and many others are not decentralized.

---

IBM’s definition says, “Blockchain technology is used in a peer-to-peer network of parties, who all participate in a given transaction.” Except that at least for one well-publicized blockchain, the one built by World Food Programme, there is only one participating party: itself. 

---

IBM goes on: “Because the ledger is distributed, everyone involved can see the ‘world state’ at any point in time and can monitor the progress of the transaction.” Mastercard’s blockchain, however, is not viewable by anybody (and seems to have no function outside of marketing since Mastercard admits that payments are still running through its existing system).

---

“Since 2007 Estonia has been operating a universal national digital identity scheme using blockchain,” the Harvard Business Review wrote last year.

Blockchain is “an append-only data structure that contains data records that are cryptographically linked together,” he said. “Data records are added to the data structure when multiple distributed parties come to consensus based on pre-agreed rules.”

https://www.theverge.com/2018/3/7/17091766/blockchain-bitcoin-ethereum-cryptocurrency-meaning

---

What is a smart contract?

The expression “smart contracts” was coined by Nick Szabo long before blockchain technology was refined. He envisioned a technology meant to replace legal contracts, where the terms of a contract could be digitized and automated. An action (payment) could be completed as soon as the condition (delivery) was met.

https://blog.malwarebytes.com/security-world/technology/2017/12/blockchain-technology-not-just-for-cryptocurrency/

---

Positive application of smart contracts

Here are some examples of how companies can benefit from using smart contracts. Using blockchain technology, they could:

Design a fully-automated supply chain management system. When a certain condition is reached, the appropriate action is taken. Imagine a factory that automatically orders supplies when it threatens to run out of them.
Manage huge paper trails. Each step in the paper trail can be added as a new block in the chain, and checks can be placed to ensure all conditions have been met that are needed to proceed.
Exchange vital business information in real time. Every node can contribute to and access all the information in the blocks.
Eliminate the middleman when dealing with others. The parties can interact directly and securely, by relying on the blockchain technology.
Eliminate fraud. Irreversibility makes it fraud-resistant. In a proper setup, there is no way to make unauthorized changes in already approved blocks.

---

Potential pitfalls of smart contracts

Reasons why companies might shy away from using blockchain technology for certain parts of their business include:

The content of the contracts is visible to all participants. There are some parts of your business that are not suitable for public knowledge. So there may be a need to encrypt certain data.
It’s impossible to correct errors. You would have to reverse the contract once a faulty one has been approved.
Long development and implementation is needed to replace existing solutions on a large scale. This may improve when we are more well-versed in applying this technology.
If personally identifiable information needs to be stored, this could break local or international regulations. For example, smart contracts would have a hard time complying with privacy laws like the upcoming GDPR.
A fully distributed network offers a larger surface for hackers. Remember that all the nodes have access to all the information. So it could pose extra risks if a hacker can access a node or pretend to be one.