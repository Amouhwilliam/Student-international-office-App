import db from "../models";
const Chat = db.chats;
const User = db.users;

const ChatSystem = (app: any) => {

    const server = require('http').Server(app)
    const io = require('socket.io')(server, {
        cors: {
            origin: "*"
        }
    })

    io.on('connection', (socket: any) =>{
        console.log('socket connected', socket.handshake.auth);
        let connectedUser = socket.handshake.auth
        let socket_ids: any[] = connectedUser?.socket_ids
        socket_ids.push(socket.id)
        connectedUser = {...connectedUser, socket_ids: socket_ids}

        User.findByIdAndUpdate(connectedUser._id, connectedUser, { useFindAndModify: false })
        .then((data: any) => {
            Chat.find({$or: [{user_starter_id: connectedUser._id}, {user_joiner_id: connectedUser._id}]})
            .then((data: any)=>{
                socket.emit('chats-list', data)
            }).catch((err: any)=>{
                console.log(err);
            })
        })
        .catch((err: any) => {
           console.log(err); 
        });

        socket.on('create-chat',(data: any)=>{
            const chat = new Chat(data)

            chat.save(data)
            .then((data: any)=>{
                Chat.find({$or: [{user_starter_id: data.user_starter_id}, {user_joiner_id: data.user_starter_id}]})
                .then((response: any)=>{
                    socket.emit('chats-list', response)
                }).catch((err: any)=>{
                    console.log(err);
                })
            }).catch((err: any)=>{
                console.log(err);
            })
        })

        socket.on('open-chat',(data: any)=>{
            Chat.findById(data.chatId)
            .then((data: any)=>{
                socket.emit('get-current-hat', data)
            }).catch((err: any)=>{
                console.log(err);
            })
        })

        socket.on("private message", (data: any) => {
            //const newLastMessage = [...data.message, message:{...data.message, fromSelf: false}]
            //const newChat = {...data, message: newMessage}

            Chat.findById(data.chatId)
            .then((res: any)=>{
                const newChat = res
                newChat.message.push({ 
                    message: data.last_message.message,
                    from: data.last_message.from
                })

                Chat.findByIdAndUpdate(newChat._id, newChat, { useFindAndModify: false })
                .then((response: any) => {
                    User.findById(data.to).then((r: any)=>{
                        for(let element of r?.socket_ids){
                            socket.to(element).emit("private message", response);
                        }
                    }).catch((err: any)=>{
                        console.log(err);
                        
                    })
                })
                .catch((err: any) => {
                    console.log(err);
                })
            }).catch((err: any)=>{
                console.log(err);
            })

          });

          socket.on("disconnect", () => {
              let disconnectedUser = {...connectedUser, socket_ids: removedInArray(connectedUser?.socket_ids, socket.id)}
            User.findByIdAndUpdate(connectedUser._id, disconnectedUser, { useFindAndModify: false })
            .then((data: any) => {
                console.log('disconnected');
            })
            .catch((err: any) => {
               console.log(err); 
            });
          });
       
        
    })

    const removedInArray = (arr: any, str: any) =>{
        return arr.filter((e:any) => e !== str)
    }




    return server
  };

export {ChatSystem}