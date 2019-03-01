# Netflux-chat #

[![Greenkeeper badge](https://badges.greenkeeper.io/coast-team/netflux-chat.svg)](https://greenkeeper.io/)

Chat application based on [Netflux](https://github.com/coast-team/netflux)

The application is available on [coast-team.github.io/netflux-chat](http://coast-team.github.io/netflux-chat/).


The application is divised in three parts :
* chat display, each message is mentionned with its author ;
* users display, each user appears here, the editable one is you, and the + button displays the id of the user ;
* chat input, you can send pictures with their URL, and links. You can use **markdown**.


Some specifications about the application : 
* you can let the ws input empty, there is a default one ;
* `:` triggers an emoji auto-complete, use tab to add the completion ;
* `/w` on start of your message triggers a private message auto-complete, use tab to add the completion ;
* the + button with caret makes easy to add a picture (including .gif) or a link if you don't know the markdown syntax ;
* you can write multi-line messages using `shift + enter` to create a new line.


## **Warning** 
fix soon : when the chat's creator leaves the application, the application is closed for other users.
