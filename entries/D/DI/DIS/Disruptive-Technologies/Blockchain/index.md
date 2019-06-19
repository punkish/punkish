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
---

## Introduction

A blockchain is distributed digital ledger technology (DLT) 

- with transactions (or blocks thereof) linked by timestamped, cryptographic hashes, 
- that may be private (permissioned) or public (permissionless),- with a mechanism for coming to a consensus about the valid state of the chain, 
- determined by a majority of the participants, 
- all of whom have equal access to all of the chain.

### Permissioned vs. Permission-less

- A *permissioned* blockchain has preapproved members who can contribute to it and have the rights to validate the block transactions. A permissioned blockchain may also restrict access to approved actors who can create smart contracts.
- A *permissionless* blockchain is public. Anyone can join and participate in the process of block verification to create consensus and also create smart contracts.

### Well-Known Blockchain Implementations

<details open>
    <summary><a href="https://bitcoin.org/en/" target="_blank">Bitcoin</a></summary>
    <p>Bitcoin is a consensus network that enables a new payment system and a completely digital money. It is the first decentralized peer-to-peer payment network that is powered by its users with no central authority or middlemen.</p>
</details>

<details open>
    <summary><a href="https://www.ethereum.org" target="_blank">Ethereum</a></summary>
    <p>Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.</p>
</details>

<details open>
    <summary><a href="https://www.hyperledger.org" target="_blank">Hyperledger</a></summary>
    <p>Hyperledger is an open source collaborative effort created to advance cross-industry blockchain technologies. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology.</p>
</details>

## Disruptive Power

## Potential for Development

### Smart Contract

An event-based program that triggers a transaction into the blockchain when a preset conditon is met. 

<cite>Pieter Arntz. 2017. Blockchain technology: not just for cryptocurrency. <a href="https://blog.malwarebytes.com/security-world/technology/2017/12/blockchain-technology-not-just-for-cryptocurrency/" target="_blank">Retrieved Nov 10, 2018</a></cite>

A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties. These transactions are trackable and irreversible.

<cite>Wikipedia contributors. (2018, November 19). Smart contract. In Wikipedia, The Free Encyclopedia. <a href="https://en.wikipedia.org/w/index.php?title=Smart_contract&oldid=869532500" target="_blank">Retrieved 11:18, November 21, 2018</a></cite>

#### Benefits of smart contracts

- Design a fully-automated system wherein the appropriate action is taken when a certain condition is reached. Imagine a factory that automatically orders supplies when it is about to run out of them.
- Manage huge paper trails. Each step in the paper trail can be added as a new block in the chain, and checks can be placed to ensure all conditions have been met that are needed to proceed.
- Exchange vital business information in real time. Every node can contribute to and access all the information in the blocks.
- Eliminate the middleman when dealing with others. The parties can interact directly and securely, by relying on the blockchain technology.
- Eliminate fraud. Irreversibility makes it fraud-resistant. In a proper setup, there is no way to make unauthorized changes in already approved blocks.

## Caveats

### Pitfalls of smart contracts

- The content of the contracts is visible to all participants. There are some parts of the contract that may not be suitable for public knowledge.
- It’s impossible to correct errors without reversing the contract once a faulty one has been approved.
- Long development and implementation is needed to replace existing solutions on a large scale.
- If personally identifiable information needs to be stored, this could break local or international regulations such as GDPR.
- Whether or not smart contracts are legally enforceable remains to be seen. A hybrid model that combines legal contracts with software code via smart contract templates might be of help. See [Legal Framework For Crypto-Ledger Transactions](https://wiki.p2pfoundation.net/Legal_Framework_For_Crypto-Ledger_Transactions) by Primavera de Filippi

### Definitions set expectations that may not be met

> The bulk of the discourse around blockchain technology states simply that “immutability is a characteristic of blockchain technology.” While it is possible that any variety of the technology could yield the emergent property of immutability, this seems highly unlikely, and is definitely not yet firmly established.

### Legislation is being proposed based on definitions

> Stating that “the data on the ledger is . . . immutable” in a statute does not mean that the data is immutable (i.e., unchangeable) in reality.

– Angela Walch in *The Path of the Blockchain Lexicon (and the Law).* <a href="https://ssrn.com/abstract=2940335" target="_blank">36 Review of Banking & Financial Law 713. SSRN</a>

### Clash With Existing Legislation and Values

How do we implement the right to be forgotten in a technology that is designed to not forget?

## Resources

### Bibliography

<details open>
<summary>Stuart Haber and Scott Stornetta. 1991. How to Time-Stamp a Digital Document. <a href="https://www.anf.es/pdf/Haber_Stornetta.pdf" target="_blank">Journal of Cryptology, Vol. 3, No. 2, pp. 99-111</a></summary>

<p>The prospect of a world in which all text, audio, picture, and video documents are in digital form on easily modifiable media raises the issue of how to certify when a document was created or last changed. The problem is to time-stamp the data, not the medium. We propose computationally practical procedures for digital time-stamping of such documents so that it is infeasible for a user either to back-date or to forward-date his document, even with the collusion of a time-stamping service. Our procedures maintain complete privacy of the documents themselves, and require no record-keeping by the time-stamping service.</p>
</details>

<details open>
<summary>Satoshi Nakamoto. 2009. Bitcoin: A Peer-to-Peer Electronic Cash System. <a href="https://bitcoin.org/bitcoin.pdf" target="_blank">Bitcoin.org</a></summary>

<p>A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.</p>
</details>

<details open>
<summary>Giuseppe Ateniese, Bernardo Magri, Daniele Venturi, and Ewerton Andrade. 2016. Redactable Blockchain – or – Rewriting History in Bitcoin and Friends. <a href="https://eprint.iacr.org/2016/757.pdf" target="_blank">Eprints</a></summary>

<p>We put forward a new framework that makes it possible to re-write or compress the content of any number of blocks in decentralized services exploiting the blockchain technol- ogy. As we argue, there are several reasons to prefer an editable blockchain, spanning from the necessity to remove inappropriate content and the possibility to support applications requiring re-writable storage, to “the right to be forgotten.”</p>
</details>

<details open>
<summary>Angela Walch. 2017. The Path of the Blockchain Lexicon (and the Law). <a href="https://ssrn.com/abstract=2940335" target="_blank">36 Review of Banking & Financial Law 713. SSRN</a></summary>

<p>The terminology around blockchain technology is notoriously confusing, with disputes over whether a blockchain is the same as a distributed ledger, or whether an appcoin is the same as a protocol token. In this article, I examine the difficulties the rapidly shifting, contested vocabulary poses for regulators seeking to understand, govern, and potentially use blockchain technology, and offer suggestions for how to fight through the haze of unclear language.</p>
</details>

<details open>
<summary>James Hazard and Helena Haapio. 2017. Wise Contracts: Smart Contracts that Work for People and Machines (February 23, 2017). Erich Schweighofer et al. (Eds.), Trends and Communities of Legal Informatics. <a href="https://ssrn.com/abstract=2925871" target="_blank">Proceedings of the 20th International Legal Informatics Symposium IRIS 2017</a>. Österreichische Computer Gesellschaft, Wien 2017, pp. 425–432 (ISBN 978-3-903035-15-7); Jusletter IT.</summary>

<p>Modern economies are held together by innumerable contracts. However, current contracts are neither machine-readable nor easily human-readable. The Ricardian Contract paradigm of parameters, prose and code posits a hybrid model of automation and conventional legal text. This paper connects recent work on design criteria for 'Smart Contract Templates' with prose objects and prototype inheritance demonstrated at CommonAccord. Templates authored and shared as prose objects can become the basis for automation, codification, commentary, big data analysis and graphic presentations.</p>
</details>

----

[Back to Disruptive Technologies](/Disruptive-Technologies)