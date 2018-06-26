---
title      : Open Hardware Licensing
description: with contribution from Ari Douglas, Sonaar Luthra and Jason Schultz
modified   : 2014-04-07
created    : 
viewcount  : 33
id         : 304
gmap       : 
tags        :
    - open hardware
    - hardware
    - OHL
    - data certification
    - FOSS
    - CERN
    - TAPR
    - sensors
    - intellectual property
    - licenses
stars      : 
---

Massively-distributed, sensor-based hardware can revolutionize collection of behavioral, environmental and public health data. However, a lack of clarity, custom and choices regarding the intellectual property (IP) of hardware poses special challenges for its developers and limits collaboration and reuse compared to the success of the free and open source software (FOSS). 

FOSS is a demonstrated success. Software developers have created a movement where they feel safe to contribute to software projects, knowing that their work will remain freely available, and that others can improve it and share the results. This reduces duplication-of-effort, accelerates follow-on innovation, and fosters transparency; the state-of-the-art is advanced; direct participants and wider society benefit.

FOSS has entered into the hardware space with projects like [Arduino](http://www.arduino.cc/), a micro-controller board that runs open software on a proprietary chip, and [Raspberry Pi](http://www.raspberrypi.org/) which runs the Linux operating system on proprietary chips. These hybrid hardware-software projects were driven by the FOSS ethos, with hardware as an incidental component.

The next frontier of open is hardware. It is a natural progression of the FOSS community’s hunger for knowledge, and it is enabled by lowered barriers to manufacturing and availability of design tools. There is a demand to carry the FOSS philosophy and ethos into the hardware space, but IP law complicates matters.

FOSS relies on copyright law which provides source code with copyright protection, and FOSS licenses with the legal teeth. Hardware, in the form of the physical layout of components on a circuit board or the arrangement of transistors inside of silicon microchips are ineligible for copyright, due to the “Useful Articles” doctrine] and the “Idea-Expression Dichotomy.” (Not to be confused with the “Functionality Doctrine” of trademark law.)

Copyright law protects original, creative works. If the work’s form is dictated by its function, the utilitarian or functional aspects of the work cannot be protected by copyright. For example, copyright might protect the graphic embellishments of a fancy chair, but the fact that the chair has four legs is necessary for it to function, and that portion of the design is ineligible for copyright protection. Circuits and circuit boards, while requiring creativity and skill to design, are considered Useful Articles, and are ineligible for copyright protection.  
 
This has created confusion for hardware developers, such as when they purport to release hardware designs under software licenses even though there is no underlying copyrightable work on which to base the license. It has also made the creation of binding open hardware licenses (OHL) difficult.

The two most high-profile examples of OHL are the [CERN OHL](http://www.ohwr.org/projects/cernohl/wiki) and the [TAPR OHL](https://www.tapr.org/OHL). Neither license has achieved a critical mass of adoption, and they differ fundamentally in scope and approach. There are open questions regarding the effectiveness of the two licenses; and their lack of adoption indicates some flaw, even if it is just a lack of understanding by hardware developers.

Another complicating matter is the subject of patents. While software patents have been widely debated and acknowledged, FOSS has not squarely dealt with the issue. In fact, the popular FOSS license, the General Public License (GPL), did not address patents in any form until its third revision. And many software projects have failed to adopt GPLv3 due to real or perceived incompatibility with previous versions of the license. To the credit of the CERN OHL and TAPR OHL, both have provisions attempting to address patent licensing.

The topic of patents is introduced not merely because open hardware deals with tangible objects, but because there are considerations peculiar to open hardware. Briefly, these include how to effect a patent license without an underlying copyright, transferability of licenses and third-party liability for patent infringement, and the pragmatic realization that there are more and newer patents in the hardware space than in software. Many of these patent considerations are unfamiliar to developers coming from the FOSS community. 

There are scenarios where hardware developers wish to release their work under OHL even when the work is encumbered by patents. They may be a patent licensee themselves, with the ability to sub-license. Or, they may have acquired patents for defensive purposes as is possible by the [Defensive Patent License](http://www.defensivepatentlicense.com/) (DPL).

Finally, and probably the most novel area of this application is the matter of data integrity in the context of open distributed sensing hardware. There is a pressing need for hardware developers in this space to exercise some control over downstream hardware, even when they desire to allow the public to freely modify and reproduce the hardware. However, retaining any control is largely anathema to the FOSS community.

Open hardware is a natural fit for distributed scientific or safety sensors. The fact that end-users have hardware designs ensures integrity through transparency. Additionally, social entrepreneurs wishing to deploy sensor networks want to leverage the mechanism of the free-market to reduce the cost of manufactured products. Manufactures are enticed to do this by the free nature of the OHL. End-users can buy the manufactured products from manufacturers, but the social entrepreneur, hardware developer needs to ensure that the manufacturer does not release faulty products.    

