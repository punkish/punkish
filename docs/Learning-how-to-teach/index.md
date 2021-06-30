---
title      : Learning how to teach
description: 
modified   : 2017-03-03 21:00:00
created    : 2017-03-03 21:00:00
viewcount  : 59
id         : 149
gmap       : 
tags        :
    - A Manifesto for Science
    - science
    - informal academies
    - citizen science
    - open hardware
stars      : 
---

Earlier last year I decided to teach myself Arduino. I started off by trying to make an air quality monitor to measure CO, humidity, temperature, and PM. Very soon I realized there were multiple disciplines that I had to learn:

- For starters, I had to know the concept of air quality. That would lead me to choose CO, hum/temp, and PM, but much of that choice was also driven by the availability of sensors. So, I had to start with environmental principles and then moderate them by market availability.

- Then I had to know about the concept of converting these components of air quality to data, something that could be measured. And I had to understand that the sensors primarily generated electrical signals in response to what they were measuring, and these electrical signals were converted to the more familiar units that I would understand. Plug in a 33 ohms resistor, they said. Why 33? Why not 22? Who decided this? What is the logic?

- There was, of course, Arduino to conquer. The "make an LED blink" tutorial was far behind me. I now had to find libraries for DHT22 and for ethernet. I had to learn how to import these. I had to even understand the concept of libraries and learn how to find them, let alone question why I needed them and why I couldn’t just write my own. (Well, I could, but "piano piano"). I could, of course, copy and paste existing sketches, but that is not learning, is it? 

- Finally, now that I had the whole set up working and the data displaying correctly on my serial monitor, I also had a rat’s nest of wires snaking around plugged into a precariously balanced bread board. I had to convert this mess into a neat box that could actually withstand the very elements it was going to measure. This is what you see, for example, in the high build quality of stuff that [the Gaudi Lab](http://www.gaudi.ch/GaudiLabs/?page_id=2) produces. It is not easy, but it is worth learning (and teaching).

So, there we have: environmental science, data science, electrical engineering, programming, and industrial design.

When I set out to teach making air quality monitors, I have to pick and choose what I can and should teach, targeting my audience with the right lessons so that it doesn’t detract from their curiosity, but also doesn’t get killed by their curiosity. Above all, I want to teach bigger concepts: don’t take things for granted, ask questions, measure, learn to create your own instruments if you can’t afford commercial ones, share, help each other. I want to change the culture of both learning and teaching. But, to get there, I have to learn the interim steps. I have to learn everything from env science to industrial design.

To be clear, not every hardware project has to be based on a microprocessor board, and hence, involve complicated electronics and programming (though, having that enables automated and data collection). (Electro-)mechanical lab equipment (most all of the above disciplines except the computing part) is of main interest to me, but that too involves notions of science, engineering and design. 
