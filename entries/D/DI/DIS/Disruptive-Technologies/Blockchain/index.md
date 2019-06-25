---
title      : Blockchain
description: Disruptive Technologies for International Development
modified   : 2019-05-26 09:05:00
created    : 2019-05-26 09:05:00
viewcount  : 0
id         : 717
gmap       : 
tags        :
    - The World Bank
    - tech primer
    - international development
    - Blockchain
stars      : 
css        : ../../css/disruptive
---

<figure>
    <img src="blockchain.png">
    <figcaption>Blockchain illustration released under the <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">CC0 Public Domain Dedication</a>.</figcaption>
</figure>

## Introduction

A blockchain is distributed digital ledger technology (DLT) with transactions (or blocks thereof) linked by timestamped, cryptographic hashes. A blockchain that may be private (permissioned) or public (permissionless), with a mechanism, typically “proof of work,” for coming to a consensus about the valid state of the chain determined by a majority of the participants all of whom have equal access to all of the chain.

### Permissioned vs. Permission-less

- A *permissioned* blockchain has preapproved members who can contribute to it and have the rights to validate the block transactions. A permissioned blockchain may also restrict access to approved actors who can create smart contracts.
- A *permissionless* blockchain is public. Anyone can join and participate in the process of block verification to create consensus and also create smart contracts.

### Cryptography and Consensus Mechanisms

A blockchain is made possible by the dual application of cryptography and some kind of a consensus mechanism. Anyone participating in the blockchain network can create a transaction, but to insert that transaction into the chain of blocks, one requires to show some evidence of deserving to do so. This is usually done by solving some complex problem, typically involving cryptography, and getting a majority of the network members (at least 51%) to approve of it. This kind of a consensus mechanism is called Proof of Work (PoW). There are many other consensus mechanisms, but PoW is the most widely implemented on.

### Well-Known Blockchain Implementations

- <a href="https://bitcoin.org/en/" target="_blank">Bitcoin</a>: Bitcoin is a consensus network that enables a new payment system and a completely digital money. It is the first decentralized peer-to-peer payment network that is powered by its users with no central authority or middlemen.
- <a href="https://www.ethereum.org" target="_blank">Ethereum</a>: Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.
- <a href="https://www.hyperledger.org" target="_blank">Hyperledger</a>: Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology.
- Smart Contracts: A smart contract is a software-based agreement between two parties that runs on a blockchain network, and triggers an outcome based on a previously agreed upon event. For example, when a certain condition is met, the smart contract can be validated and it can discharge a sum of money from one of the contracting parties to another. Imagine a factory that automatically orders supplies when it is about to run out of them.

## Disruptive Power

The most obvious and well-known disruption attributed to blockchain is, of course, the financial system, so much so that blockchain is almost synonymous with Bitcoin, the cryptocurrency that utilizes blockchain for recording its transactions. But blockchain can be used in any system that requires keeping a ledger of transactions of any kind – interaction with health providers, service delivery of benefits, and civic services. Having an open but tamperproof ledge of activities can be useful for ensuring transparency in government and social services.

## Potential for Development

Blockchain can be used in any system that requires keeping a ledger of transactions of any kind – interaction with health providers, service delivery of benefits, and civic services. Having an open but tamperproof ledge of activities can be useful for ensuring transparency in government and social services. As such, blockchain can be quite disruptive to established services that are generally opaque to common citizens and, in places, rife with corruption.

## Caveats

Like any new technology, or perhaps even more so, blockchain is hyped beyond its potential. Its use in cryptocurrency has potential for massive financial frauds, and many countries around the world are still figuring out how to allow, if at all, such currencies to coexist with the established financial system. Also, since the transparency of the blockchain is important in that it allows everyone to look at it, it may not be the desired platform where privacy is important. It’s impossible to correct errors without reversing a transaction, and it is the irreversibility that makes a blockchain special in the first place. Finally, whether or not smart contracts are legally enforceable remains to be seen.

### Definitions set expectations that may not be met

The bulk of the discourse around blockchain technology states simply that “immutability is a characteristic of blockchain technology.” While it is possible that any variety of the technology could yield the emergent property of immutability, this seems highly unlikely, and is definitely not yet firmly established. For example, legislation is being proposed based on definitions, but stating that “the data on the ledger is . . . immutable” in a statute does not mean that the data is immutable (i.e., unchangeable) in reality.

### Clash With Existing Legislation and Values

How do we implement the right to be forgotten in a technology that is designed to not forget?

## Resources

<details class="video" open>
    <summary><a href="https://www.youtube.com/watch?v=SSo_EIwHSd4" target="_blank">How does a blockchain work - Simply Explained</a></summary> 
    <p>What is a blockchain and how do they work? Explained in simple and plain English!</p>
</details>

<details class="video">
    <summary><a href="https://punkish.org/Demystifying-Blockchains" target="_blank">Demystifying Blockchains</a></summary>
    <p>A blockchain primer and demo.</p>
</details>

<details class="video">
    <summary><a href="https://www.youtube.com/watch?v=8fbhI1qVj0c" target="_blank">How Blockchain can transform India</a></summary>
    <p>Blockchain is currently at the peak of the Hype Cycle. It is a simple concept, yet difficult to understand and comprehend. It is also in the same place as the Internet was in 1995 – very early, with its major applications yet to be built. Blockchain is a much a philosophy as a technology, and has the potential to change the world as the Internet did. It promises to radically transform identity, agriculture, money, energy, governance, and pretty much everything else, especially in the emerging countries. This TEDx talk demystifies blockchain as never before, and explains how it can change the world around you.</p>
</details>

<details class="text">
    <summary>Stuart Haber and Scott Stornetta. 1991. <a href="" target="_blank">How to Time-Stamp a Digital Document.</a> Journal of Cryptology, Vol. 3, No. 2, pp. 99-111</summary>
    <p>The prospect of a world in which all text, audio, picture, and video documents are in digital form on easily modifiable media raises the issue of how to certify when a document was created or last changed. The problem is to time-stamp the data, not the medium. We propose computationally practical procedures for digital time-stamping of such documents so that it is infeasible for a user either to back-date or to forward-date his document, even with the collusion of a time-stamping service. Our procedures maintain complete privacy of the documents themselves, and require no record-keeping by the time-stamping service.</p>
</details>

<details class="text">
    <summary>Satoshi Nakamoto. 2009. <a href="https://bitcoin.org" target="_blank">Bitcoin: A Peer-to-Peer Electronic Cash System</a></summary>
    <p>A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.</p>
</details>

<details class="text">
    <summary>Giuseppe Ateniese, Bernardo Magri, Daniele Venturi, and Ewerton Andrade. 2016. <a href="https://eprint.iacr.org/2016/757.pdf" target="_blank">Redactable Blockchain – or – Rewriting History in Bitcoin and Friends.</a> Eprints</summary>
    <p>We put forward a new framework that makes it possible to re-write or compress the content of any number of blocks in decentralized services exploiting the blockchain technol- ogy. As we argue, there are several reasons to prefer an editable blockchain, spanning from the necessity to remove inappropriate content and the possibility to support applications requiring re-writable storage, to “the right to be forgotten.”</p>
</details>

<details class="text">
    <summary>Angela Walch. 2017. <a href="https://ssrn.com/abstract=2940335" target="_blank">The Path of the Blockchain Lexicon (and the Law).</a> 36 Review of Banking & Financial Law 713. SSRN</summary>
    <p>The terminology around blockchain technology is notoriously confusing, with disputes over whether a blockchain is the same as a distributed ledger, or whether an appcoin is the same as a protocol token. In this article, I examine the difficulties the rapidly shifting, contested vocabulary poses for regulators seeking to understand, govern, and potentially use blockchain technology, and offer suggestions for how to fight through the haze of unclear language.</p>
</details>

<details class="text">
    <summary>James Hazard and Helena Haapio. 2017. <a href="https://ssrn.com/abstract=2925871" target="_blank">Wise Contracts: Smart Contracts that Work for People and Machines (February 23, 2017). In Trends and Communities of Legal Informatics.</a> Proceedings of the 20th International Legal Informatics Symposium IRIS 2017. Österreichische Computer Gesellschaft, Wien 2017, pp. 425–432; Jusletter IT.</summary>
    <p>Modern economies are held together by innumerable contracts. However, current contracts are neither machine-readable nor easily human-readable. The Ricardian Contract paradigm of parameters, prose and code posits a hybrid model of automation and conventional legal text. This paper connects recent work on design criteria for 'Smart Contract Templates' with prose objects and prototype inheritance demonstrated at CommonAccord. Templates authored and shared as prose objects can become the basis for automation, codification, big data analysis and graphic presentations.</p>
</details>

<details class="text">
    <summary>Wikipedia contributors. (2018, November 19). <a href="https://en.wikipedia.org/w/index.php?title=Smart_contract&oldid=869532500" target="_blank">Smart contract. In Wikipedia, The Free Encyclopedia.</a> Retrieved 11:18, November 21, 2018</summary>
    <p>A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties. These transactions are trackable and irreversible.</p>
</details>

<details class="text">
    <summary>Primavera de Filippi. <a href="https://wiki.p2pfoundation.net/Legal_Framework_For_Crypto-Ledger_Transactions" target="_blank">Legal Framework For Crypto-Ledger Transactions.</a> P2P Foundation.</summary>
    <p>A hybrid model that combines legal contracts with software code via smart contract templates might be of help.</p>
</details>

----

[Back to Disruptive Technologies](/Disruptive-Technologies)