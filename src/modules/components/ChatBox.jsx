import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import QuillEditor from '../experiment/components/QuillEditor';
import axios from '../services/axios';
import auth from '../user/auth';
import { socket } from '../dashboard/dashboard';
import { useLocation, useParams } from 'react-router-dom';
import utils from './utils';
import ReactTimeAgo from 'react-time-ago';

let mentionValues = [];

// ===================================================================================================>
// SUB-COMPONENTS:
// ===================================================================================================>

const ProfileHeader = ({ user, onClick }) => {

    return (
        <div className='p-2 chat-profile-container'>
            <div className='d-flex align-items-start '>

                <div className='flex-shrink-0 me-3 align-self-center'>
                    <Avatar name={user} size="30" style={{ fontSize: 10 }} round={true} />
                </div>

                <div className='flex-grow-1'>
                    <h5 className='d-flex align-items-center m-0' style={{ fontSize: 15, fontWeight: 600 }}>
                        {user}
                        <div className='user-status-indicator' style={{ backgroundColor: '#2ab57d' }}></div>
                    </h5>

                    <p className="text-muted mb-0">Available</p>
                </div>

                <button className='refresh-button' onClick={onClick}>
                    <i className="fa">&#xf021;</i>
                </button>

            </div>
        </div>
    )
}

const OthersChat = ({ v, handleReply, getChat, isReply = false, comment = null }) => {

    return (
        <>
            <div className="conversation-list">
                <div className="ctext-wrap">
                    <div className="ctext-wrap-content">
                        <h5 className="conversation-name">
                            <span className="user-name">
                                {isReply ? comment?.userProfile : v?.userProfile}
                            </span>
                        </h5>

                        {isReply &&
                            <div className="ctext-wrap-content right reply-msg" style={{ letterSpacing: 0.5, fontSize: 11, padding: 7 }}>
                                <Avatar name={isReply ? v?.userProfile : comment?.userProfile} size="15" round={true} />
                                <p className="mb-0 ms-1 right text-start" style={{ fontStyle: 'italic' }}>{getChat(isReply ? v?.text : comment?.commentText)}</p>
                            </div>
                        }

                        <p className="mb-0">{getChat(isReply ? comment?.commentText : v?.text, true)}</p>

                        <div className="time">{utils.formatDateTime(isReply ? comment.createdAt : v?.createdAt).slice(11)}</div>

                    </div>

                    <div className="dropdown align-self-start">
                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </a>
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => { handleReply(isReply ? comment : v) }}>Reply</div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

const UsersChat = ({ v, handleReply, getChat, isReply = false, comment = null }) => {


    return (
        <>
            <div className="conversation-list right">
                <div className="ctext-wrap right">
                    <div className="ctext-wrap-content right">

                        <h5 className="conversation-name right">
                            <span className="user-name right">
                                {isReply ? comment?.userProfile : v?.userProfile}
                            </span>
                        </h5>


                        {isReply &&
                            <div className="ctext-wrap-content d-flex p-2 reply-msg" style={{ letterSpacing: 0.5, fontSize: 11 }}>
                                <Avatar name={isReply ? v?.userProfile : comment?.userProfile} size="15" round={true} />
                                <p className="mb-0 ms-1 text-start" style={{ fontStyle: 'italic' }}>{getChat(isReply ? v?.text : comment?.commentText)}</p>
                            </div>
                        }

                        <p className="mb-0 right text-start">{getChat(isReply ? comment?.commentText : v?.text)}</p>

                        <div className="time right">{utils.formatDateTime(isReply ? comment.createdAt : v?.createdAt).slice(11)}</div>

                    </div>


                    <div className="dropdown align-self-start right">
                        <a className="dropdown-toggle right" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                        </a>
                        <div className="dropdown-menu right">
                            <div className="dropdown-item right" onClick={() => handleReply(isReply ? comment : v)}>Reply</div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

const ChatContainer = ({ list = [], children }) => {

    return (
        <>
            {list?.length === 0 ? <center className='no-conversation-found' style={{ height: '86%' }}>No Conversation Found!</center> : children}
        </>
    )
}

// ===================================================================================================>
// MAIN-COMPONENT:
// ===================================================================================================>

// const ChatBox = ({ contextId, contextType, handleNewConversation = null, key, experimentAccess = null }) => {

//     const quillRef = useRef();

//     const [value, setValue] = useState();
//     const [chats, setChats] = useState([]);
//     const [activeChatId, setActiveChatId] = useState(null);
//     const [conversationId, setConversationId] = useState(null);
//     const [experimentName, setExperimentName] = useState('Unknown Experiment');
//     const [experimentStatus, setExperimentStatus] = useState(null);
//     const [chatClass, setChatClass] = useState('');
//     const [enable, setEnable] = useState('auto');
//     const chatContainerRef = useRef(null);

//     const { experimentId } = useParams();
//     const location = useLocation();

//     const userId = auth.getStorageData("id");
//     const userFullName = auth.getStorageData("fullName");

//     const setDefaultMentions = () => {

//         axios.getWithCallback(`user`, (data) => {

//             if (data) {

//                 const userProfileDetails = data.map(element => { return { value: element?.id, label: element?.userProfile?.firstName, email: element?.email } });

//                 const newValues = userProfileDetails.map((x) => ({ id: x.value, value: x.label }));
//                 const filteredValues = newValues.filter(x => x.id !== userId)
//                 mentionValues = [ ...filteredValues ];

//             }

//         }, null);

//     }

//     const getAllConversion = () => {

//         if(contextId !== null && contextId !== undefined && contextId == experimentId) {

//             axios.getWithCallback(`conversation/${contextType}/${contextId}`, (resp) => {

//                 const data = resp?.data;

//                 if(data.length) {

//                     const newChats = data.map(chatDetails => {

//                         const comments = chatDetails.replies.map((reply) => {

//                             return {

//                                 id: reply?.id,
//                                 userId: reply?.userId,
//                                 commentText: reply?.text,
//                                 userProfile: reply?.replyUsers?.userProfile?.firstNameLastName,
//                                 createdAt: reply?.createDateTime

//                             };

//                         });

//                         return {
//                             id: chatDetails?.id,
//                             conversationId: chatDetails?.conversationId,
//                             userId: chatDetails?.users.userProfile?.id,
//                             contextType: contextType,
//                             text: chatDetails?.text,
//                             comments: comments,
//                             userProfile: chatDetails?.users?.userProfile?.firstNameLastName,
//                             createdAt: chatDetails?.createDateTime
//                         };

//                     });

//                     setChats([ ...newChats ]);
//                     setConversationId(data[0]?.conversationId);
//                 }

//             });

//         }

//     }

//     const getExperimentName = () => {

//         if(contextId !== null && contextId !== undefined) {

//             axios.getWithCallback(`/experiment/${contextId}`, (data) => {

//                 setExperimentName(data.experimentName);
//                 setExperimentStatus(data?.schemeStatus);

//             }, null)

//         }

//     }

//     const scrollToBottom = () => {
//         if (chatContainerRef.current) {
//             const chatContainer = chatContainerRef.current;
//             chatContainer.scrollTop = chatContainer.scrollHeight + 10;
//         }
//     };

//     const handleDisableChats = () => {
//         setChats([]);
//         let editor = document.querySelector('.quill-container-review');
//         if (editor) {
//             editor.style.userSelect = 'none';
//             editor.style.pointerEvents = 'none';
//         }
//     }

//     const handleEnableChats = () => {
//         let editor = document.querySelector('.quill-container-review');
//         if (editor) {
//             editor.style.userSelect = 'auto';
//             editor.style.pointerEvents = 'auto';
//         }
//     }

//     useEffect(() => {

//         if (contextType === 'EXPERIMENT_CONVERSATION') {

//             setChatClass(experimentStatus === 'Closed' ? 'disabled-component-div' : 'custom-chats-section')
//             setEnable(experimentStatus === 'Closed' ? 'none' : 'auto')

//             console.log('1')

//         } else {

//             setChatClass(experimentStatus === 'Closed' ? 'disabled-component-div' : experimentAccess === 'REVIEW' ? 'custom-chats-section' : 'disabled-component-div')
//             setEnable(experimentStatus === 'Closed' ? 'none' : experimentAccess === 'REVIEW' ? 'auto' : 'none')

//             console.log('2')
//         }

//         let editor = document.querySelector('.quill-container-review');
//         if (editor) {
//             editor.style.userSelect = enable;
//             editor.style.pointerEvents = enable;
//         }

//         return () => {}

//     }, [location.pathname, experimentStatus, experimentAccess, contextType]);

//     useEffect(() => {

//         setDefaultMentions();
//         getExperimentName();
//         getAllConversion();

//         return () => { };

//     }, [contextType, contextId, key]);

//     useEffect(() => {

//         scrollToBottom();

//     }, [chats]);

//     useEffect(() => {

//         const handleConversation = (newChats) => {

//             if (newChats.replyTo) {

//                 if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType) {

//                     setChats((prevState) => {

//                         // Find the chat to update by its id
//                         const updatedChats = prevState.map((chat) => {

//                             if (chat.comments.length) {

//                                 const ids = chat.comments.map(x => x.id);

//                                 if (chat.id === newChats.replyTo || ids.includes(newChats.replyTo)) {

//                                     return {

//                                         ...chat,
//                                         comments: [
//                                             ...chat.comments,
//                                             {
//                                                 id: newChats.id,
//                                                 userId: newChats.userId,
//                                                 commentText: newChats.text,
//                                                 userProfile: newChats.userProfile?.firstNameLastName,
//                                                 createdAt: newChats?.createDateTime
//                                             },
//                                         ],

//                                     };

//                                 }

//                             } else if (chat.id === newChats.replyTo) {

//                                 return {

//                                     ...chat,
//                                     comments: [
//                                         ...chat.comments,
//                                         {
//                                             id: newChats.id,
//                                             userId: newChats.userId,
//                                             commentText: newChats.text,
//                                             userProfile: newChats.userProfile?.firstNameLastName,
//                                             createdAt: newChats?.createDateTime
//                                         },
//                                     ],

//                                 };

//                             }

//                         return chat;

//                         });

//                         return updatedChats;

//                     })
//                 }

//             } else {

//                 const chat = {
//                     id: newChats?.id,
//                     conversationId: newChats?.conversationId,
//                     userId: newChats?.userId,
//                     text: newChats.text,
//                     contextType: newChats?.contextType,
//                     comments: [],
//                     userProfile: newChats?.userProfile?.firstNameLastName,
//                     createdAt: newChats?.createDateTime
//                 };

//                 // conversationId === null && setConversationId(newChats?.conversationId);

//                 if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType)
//                     setChats((prevState) => ([ ...prevState, chat ]))

//             }

//         }

//         socket.on('new-conversation', handleConversation);

//         return () => socket.off('new-conversation');

//     }, [contextType, contextId, key]);

//     const getChat = (text, colorChange = false) => {

//         const newText = text ?? 'No Comment';
//         const stringArr = newText.split(' ');
//         let MentionName = '', flag = true, firstPart = '', lastPart = '';

//         for (let i = 0; i < stringArr.length; i++) {

//             if (flag === false && stringArr[i].includes('@') === false) {

//                 lastPart += ' ' + stringArr[i];

//             }

//             if (stringArr[i].includes('@')) {

//                 MentionName += stringArr[i] + ' ';
//                 flag = false;

//             }

//             if (flag === true) {

//                 firstPart += stringArr[i] + ' ';

//             }
//         }


//         const element = <span>{firstPart}<span className='mention-name' style={{ color: colorChange ? '#80afc9': '' }}>{MentionName}</span>{lastPart.trimEnd()}</span>;

//         return flag ? firstPart : element;


//     }

//     const handleChange = (text) => {
//         setValue(text);
//     };

//     const handleReplySubmit = (e, chatId, text) => {

//         e.preventDefault();

//         getAllConversion();

//         const payload = {
//             conversationId: conversationId,
//             text: text,
//             userId: userId,
//             replyTo: chatId,
//             createdBy: userId,
//             lastChangedBy: userId
//         }

//         axios.post('comment', payload);
//     }

//     const doesConversationExists = async (type, id) => {

//         const resp = await axios.get(`conversation/${type}/${id}`);
//         const data = resp?.data?.data;

//         let x = data.length ? true : false;

//         return x;

//     }

//     const handleChatSubmit = async (e) => {

//         e.preventDefault();

//         let doc = document.getElementById('reply-container');
//         doc !== null && doc.remove();

//         const arr = quillRef.current?.getEditor().editor.delta.ops;
//         let mentionUsers = [];

//         const newArr = arr.map(v => {

//             if(typeof v.insert !== typeof '') {

//                 const mentionName = v.insert.mention.value;
//                 const temp = mentionValues.filter((v) => v.value === mentionName);
//                 mentionUsers.push(...temp);
//                 return `@${mentionName}`;

//             }

//             return v.insert;

//         });

//         const mentionIds = mentionUsers.map(v => v.id);

//         const chatText = newArr.join('');

//         if (activeChatId !== null) {

//             handleReplySubmit(e, activeChatId, chatText);
//             setActiveChatId(null);
//             setValue('');

//         } else {

//             const chatId = chats.length ? chats[chats.length - 1].id + 1 : '';

//             const newChat = {
//                 id: chatId,
//                 userId: parseInt(userId),
//                 text: chatText,
//                 comments: [],
//                 userProfile: userFullName
//             };

//             setValue('');

//             e.target.reset();

//             const answer = await doesConversationExists(contextType, contextId);


//             if (conversationId === null || !answer) {

//                 const initialPayload = {

//                     initiator: userId,
//                     contextId: parseInt(contextId),
//                     conversationTitle: 'EXPERIMENT',
//                     contextType: contextType,
//                     startDate: new Date(),
//                     closedDate: null,
//                     userId: userId,
//                     createdBy: userId,
//                     lastChangedBy: userId,
//                     text: newChat.text,
//                     conversationId: conversationId

//                 }

//                 axios.post(`conversation`, initialPayload)
//                 .then((resp) => {
//                     const result = resp?.data?.data;
//                     setConversationId(result?.id);
//                     !!handleNewConversation && handleNewConversation(result?.id);

//                 }).catch((err) => {
//                     console.log(err);
//                 })

//             } else {

//                 const updateConversation = {

//                     id: !!conversationId ? conversationId : chats[chats.length - 1].conversationId,
//                     text: newChat.text,
//                     userId: userId,
//                     contextId: parseInt(contextId),
//                     contextType: contextType,
//                     replyTo: null,
//                     createdBy: userId,
//                     lastChangedBy: userId
//                 }

//                 await axios.put(`conversation`, updateConversation);

//             }

//             if (mentionIds.length) {

//                 const newString = newArr.filter(text => !text.includes('@')).join('').trim();
//                 const content = newString.replace(/\s+/g, ' ');
//                 const header = contextType === "EXPERIMENT_CONVERSATION" ? `Comment on ${experimentName}` : `Review Comment on ${experimentName}`;

//                 const notificationPayload = {

//                     contextId: typeof contextId === '' ? contextId : `${contextId}`,
//                     contextType: contextType,
//                     header: header,
//                     content: content,
//                     link: `/update-experiment/${contextId}`,
//                     userId: mentionIds,
//                     read: false,
//                     createdBy: userId,
//                     lastChangedBy: userId,

//                 }

//                 axios.post(`/notification`, notificationPayload);

//             }

//         }

//     };

//     const handleReply = (chat) => {

//         const chatId = chat.id;


//         if (activeChatId === chatId) {

//             setActiveChatId(null);

//             let doc1 = document.getElementById('reply-container');
//             doc1 !== null && doc1.remove();

//         } else {

//             setActiveChatId(chatId);

//             let doc1 = document.getElementById('reply-container');

//             doc1 !== null && doc1.remove();

//             const doc = quillRef.current?.getEditor()?.container;
//             let x = document.createElement('div');
//             x.setAttribute('class', 'reply-container');
//             x.setAttribute('id', 'reply-container');

//             x.innerHTML = `<div class='border-left'><div>${chat.text || chat.commentText}</div><i id='closeReplyBtn' class="btn btn-danger fa fa-times"></i></div>`;

//             doc.appendChild(x);

//             let closeIcon = document.getElementById('closeReplyBtn');
//             closeIcon.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 x.remove();
//                 setActiveChatId(null);
//             })

//         }

//     };

//     return (

//          <div className={chatClass} key={key}>

//             <section>

//                 <ProfileHeader user={userFullName} onClick={getAllConversion} />

//                 <div className='chats-room-container' ref={(el) => (chatContainerRef.current = el)}>

//                     {/* <div class="chat-day-title">
//                         <span class="title">Today</span>
//                     </div> */}

//                         <ChatContainer list={chats}>
//                             {
//                                 chats.map((v, index) => (

//                                     v.userId == userId
//                                     ? v.comments.length ?
//                                         <>
//                                             <UsersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
//                                             {v.comments.map((x) => (
//                                                 x.userId !== userId
//                                                 ? <OthersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
//                                                 : <UsersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
//                                             ))}
//                                         </> : <UsersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
//                                     : v.comments.length ?
//                                         <>
//                                             <OthersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
//                                             {v.comments.map((x) => (
//                                                 x.userId === userId
//                                                 ? <UsersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
//                                                 : <OthersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
//                                             ))}
//                                         </> : <OthersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />

//                                 ))
//                             }
//                         </ChatContainer>

//                 </div>

//                 <div style={{ marginTop: 15 }}>
//                     <QuillEditor handleChange={handleChange} handleSubmit={handleChatSubmit} quillRef={quillRef} value={value} mentionNames={mentionValues} />
//                 </div>

//             </section>

//         </div>

//     )

// }

const ChatBox = (props) => {

    const { chats, setChats, conversationId, setConversationId } = props;
    const { handleNewConversation = null, contextId, contextType, key } = props;

    const quillRef = useRef(null);
    const chatContainerRef = useRef(null);

    const [value, setValue] = useState();
    const [activeChatId, setActiveChatId] = useState(null);
    const [experimentStatus, setExperimentStatus] = useState(null);
    const [experimentName, setExperimentName] = useState('Unknown Experiment');
    const [chatClass, setChatClass] = useState('custom-chats-section')

    const userId = auth.getStorageData("id");
    const userFullName = auth.getStorageData("fullName");

    const { experimentId } = useParams();

    const setDefaultMentions = () => {

        axios.getWithCallback(`user`, (data) => {

            if (data) {

                const userProfileDetails = data.map(element => { return { value: element?.id, label: element?.userProfile?.firstName, email: element?.email } });

                const newValues = userProfileDetails.map((x) => ({ id: x.value, value: x.label }));
                const filteredValues = newValues.filter(x => x.id !== userId)
                mentionValues = [ ...filteredValues ];

            }

        }, null);

    }

    const getAllConversion = () => {

        if(contextId !== null && contextId !== undefined && contextId == experimentId) {

            axios.getWithCallback(`conversation/${contextType}/${contextId}`, (resp) => {

                const data = resp?.data;

                if(data.length) {

                    const newChats = data.map(chatDetails => {

                        const comments = chatDetails.replies.map((reply) => {

                            return {

                                id: reply?.id,
                                userId: reply?.userId,
                                commentText: reply?.text,
                                userProfile: reply?.replyUsers?.userProfile?.firstNameLastName,
                                createdAt: reply?.createDateTime

                            };

                        });

                        return {
                            id: chatDetails?.id,
                            conversationId: chatDetails?.conversationId,
                            userId: chatDetails?.users.userProfile?.id,
                            contextType: contextType,
                            text: chatDetails?.text,
                            comments: comments,
                            userProfile: chatDetails?.users?.userProfile?.firstNameLastName,
                            createdAt: chatDetails?.createDateTime
                        };

                    });

                    setChats([ ...newChats ]);
                    setConversationId(data[0]?.conversationId);
                }

            });

        }

    }

    const getExperimentName = () => {

        if(contextId !== null && contextId !== undefined) {

            axios.getWithCallback(`/experiment/${contextId}`, (data) => {

                setExperimentName(data.experimentName);
                setExperimentStatus(data?.schemeStatus);

            }, null)

        }

    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            const chatContainer = chatContainerRef.current;
            chatContainer.scrollTop = chatContainer.scrollHeight + 10;
        }
    };

    const handleEditor = () => {
        
        let editor = document.querySelector('.quill-container-review');
        
        if (!!experimentId && editor) {
            editor.style.userSelect = experimentStatus === 'Closed' ? 'none' : 'auto';
            editor.style.pointerEvents = experimentStatus === 'Closed' ? 'none' : 'auto';
            setChatClass(experimentStatus === 'Closed' ? 'disabled-component-div' : 'custom-chats-section' )
        } else {
            editor.style.userSelect = 'none';
            editor.style.pointerEvents = 'none';
            setChatClass('disabled-component-div')
        }

    }

    useEffect(() => {

        scrollToBottom();

    }, [chats]);

    useEffect(() => {

        setDefaultMentions();
        getAllConversion();
        getExperimentName();
        handleEditor();

        return () => { };

    }, [experimentId]);

    const getChat = (text, colorChange = false) => {

        const newText = text ?? 'No Comment';
        const stringArr = newText.split(' ');
        let MentionName = '', flag = true, firstPart = '', lastPart = '';

        for (let i = 0; i < stringArr.length; i++) {

            if (flag === false && stringArr[i].includes('@') === false) {

                lastPart += ' ' + stringArr[i];

            }

            if (stringArr[i].includes('@')) {

                MentionName += stringArr[i] + ' ';
                flag = false;

            }

            if (flag === true) {

                firstPart += stringArr[i] + ' ';

            }
        }


        const element = <span>{firstPart}<span className='mention-name' style={{ color: colorChange ? '#80afc9': '' }}>{MentionName}</span>{lastPart.trimEnd()}</span>;

        return flag ? firstPart : element;


    }

    const handleChange = (text) => {
        setValue(text);
    };

    const handleReplySubmit = (e, chatId, text) => {

        e.preventDefault();

        getAllConversion();

        const payload = {
            conversationId: conversationId,
            text: text,
            userId: userId,
            replyTo: chatId,
            createdBy: userId,
            lastChangedBy: userId
        }

        axios.post('comment', payload);
    }

    const doesConversationExists = async (type, id) => {

        const resp = await axios.get(`conversation/${type}/${id}`);
        const data = resp?.data?.data;

        let x = data.length ? true : false;

        return x;

    }

    const handleChatSubmit = async (e) => {

        e.preventDefault();

        let doc = document.getElementById('reply-container');
        doc !== null && doc.remove();

        const arr = quillRef.current?.getEditor().editor.delta.ops;
        let mentionUsers = [];

        const newArr = arr.map(v => {

            if(typeof v.insert !== typeof '') {

                const mentionName = v.insert.mention.value;
                const temp = mentionValues.filter((v) => v.value === mentionName);
                mentionUsers.push(...temp);
                return `@${mentionName}`;

            }

            return v.insert;

        });

        const mentionIds = mentionUsers.map(v => v.id);

        const chatText = newArr.join('');

        if (chatText.length > 1) {

            if (activeChatId !== null) {
    
                handleReplySubmit(e, activeChatId, chatText);
                setActiveChatId(null);
                setValue('');
    
            } else {
    
                const chatId = chats.length ? chats[chats.length - 1].id + 1 : '';
    
                const newChat = {
                    id: chatId,
                    userId: parseInt(userId),
                    text: chatText,
                    comments: [],
                    userProfile: userFullName
                };
    
                setValue('');
    
                e.target.reset();
    
                const answer = await doesConversationExists(contextType, contextId);
    
    
                if (conversationId === null || !answer) {
    
                    const initialPayload = {
    
                        initiator: userId,
                        contextId: parseInt(contextId),
                        conversationTitle: 'EXPERIMENT',
                        contextType: contextType,
                        startDate: new Date(),
                        closedDate: null,
                        userId: userId,
                        createdBy: userId,
                        lastChangedBy: userId,
                        text: newChat.text,
                        conversationId: conversationId
    
                    }
    
                    axios.post(`conversation`, initialPayload)
                    .then((resp) => {
                        const result = resp?.data?.data;
                        setConversationId(result?.id);
                        !!handleNewConversation && handleNewConversation(result?.id);
    
                    }).catch((err) => {
                        console.log(err);
                    })
    
                } else {
    
                    const updateConversation = {
    
                        id: !!conversationId ? conversationId : chats[chats.length - 1].conversationId,
                        text: newChat.text,
                        userId: userId,
                        contextId: parseInt(contextId),
                        contextType: contextType,
                        replyTo: null,
                        createdBy: userId,
                        lastChangedBy: userId
                    }
    
                    await axios.put(`conversation`, updateConversation);
    
                }
    
                if (mentionIds.length) {
    
                    const newString = newArr.filter(text => !text.includes('@')).join('').trim();
                    const content = newString.replace(/\s+/g, ' ');
                    const header = contextType === "EXPERIMENT_CONVERSATION" ? `Comment on ${experimentName}` : `Review Comment on ${experimentName}`;
    
                    const notificationPayload = {
    
                        contextId: typeof contextId === '' ? contextId : `${contextId}`,
                        contextType: contextType,
                        header: header,
                        content: content,
                        link: `/update-experiment/${contextId}`,
                        userId: mentionIds,
                        read: false,
                        createdBy: userId,
                        lastChangedBy: userId,
    
                    }
    
                    axios.post(`/notification`, notificationPayload);
    
                }
    
            }
        }

    };

    const handleReply = (chat) => {

        const chatId = chat.id;


        if (activeChatId === chatId) {

            setActiveChatId(null);

            let doc1 = document.getElementById('reply-container');
            doc1 !== null && doc1.remove();

        } else {

            setActiveChatId(chatId);

            let doc1 = document.getElementById('reply-container');

            doc1 !== null && doc1.remove();

            const doc = quillRef.current?.getEditor()?.container;
            let x = document.createElement('div');
            x.setAttribute('class', 'reply-container');
            x.setAttribute('id', 'reply-container');

            x.innerHTML = `<div class='border-left'><div>${chat.text || chat.commentText}</div><i id='closeReplyBtn' class="btn btn-danger fa fa-times"></i></div>`;

            doc.appendChild(x);

            let closeIcon = document.getElementById('closeReplyBtn');
            closeIcon.addEventListener('click', (e) => {
                e.preventDefault();
                x.remove();
                setActiveChatId(null);
            })

        }

    };

    return (

         <div className={chatClass} key={key}>

            <section>

                <ProfileHeader user={userFullName} onClick={getAllConversion} />

                <div className='chats-room-container' ref={(el) => (chatContainerRef.current = el)}>

                    {/* <div class="chat-day-title">
                        <span class="title">Today</span>
                    </div> */}

                        <ChatContainer list={chats}>
                            {
                                chats.map((v, index) => (

                                    v.userId == userId
                                    ? v.comments.length ?
                                        <>
                                            <UsersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
                                            {v.comments.map((x) => (
                                                x.userId !== userId
                                                ? <OthersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
                                                : <UsersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
                                            ))}
                                        </> : <UsersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
                                    : v.comments.length ?
                                        <>
                                            <OthersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />
                                            {v.comments.map((x) => (
                                                x.userId === userId
                                                ? <UsersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
                                                : <OthersChat key={x.id} v={v} comment={x} handleReply={handleReply} getChat={getChat} isReply={true}  />
                                            ))}
                                        </> : <OthersChat key={v.id} v={v} handleReply={handleReply} getChat={getChat} />

                                ))
                            }
                        </ChatContainer>

                </div>

                <div style={{ marginTop: 15 }}>
                    <QuillEditor handleChange={handleChange} handleSubmit={handleChatSubmit} quillRef={quillRef} value={value} mentionNames={mentionValues} />
                </div>

            </section>

        </div>

    )

}

export const ReviewChat = ({ contextId, contextType, key, handleNewConversation }) => {

    const [chats, setChats] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {

        const handleConversation = (newChats) => {

            if (newChats.replyTo) {

                if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType) {

                    setChats((prevState) => {

                        // Find the chat to update by its id
                        const updatedChats = prevState.map((chat) => {

                            if (chat.comments.length) {

                                const ids = chat.comments.map(x => x.id);

                                if (chat.id === newChats.replyTo || ids.includes(newChats.replyTo)) {

                                    return {

                                        ...chat,
                                        comments: [
                                            ...chat.comments,
                                            {
                                                id: newChats.id,
                                                userId: newChats.userId,
                                                commentText: newChats.text,
                                                userProfile: newChats.userProfile?.firstNameLastName,
                                                createdAt: newChats?.createDateTime
                                            },
                                        ],

                                    };

                                }

                            } else if (chat.id === newChats.replyTo) {

                                return {

                                    ...chat,
                                    comments: [
                                        ...chat.comments,
                                        {
                                            id: newChats.id,
                                            userId: newChats.userId,
                                            commentText: newChats.text,
                                            userProfile: newChats.userProfile?.firstNameLastName,
                                            createdAt: newChats?.createDateTime
                                        },
                                    ],

                                };

                            }

                        return chat;

                        });

                        return updatedChats;

                    })
                }

            } else {

                const chat = {
                    id: newChats?.id,
                    conversationId: newChats?.conversationId,
                    userId: newChats?.userId,
                    text: newChats.text,
                    contextType: newChats?.contextType,
                    comments: [],
                    userProfile: newChats?.userProfile?.firstNameLastName,
                    createdAt: newChats?.createDateTime
                };

                // conversationId === null && setConversationId(newChats?.conversationId);

                if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType)
                    setChats((prevState) => ([ ...prevState, chat ]))

            }

        }

        socket.on('new-conversation', handleConversation);

        return () => socket.off('new-conversation');

    }, [contextType, contextId, key]);

    const propsForChatBox = {
        chats, setChats, conversationId, setConversationId,
        contextId, contextType, key, handleNewConversation
    }

    return (
        <ChatBox { ...propsForChatBox } />
    )

}

export const ConversationChat = ({ contextId, contextType, key }) => {

    const [chats, setChats] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {

        const handleConversation = (newChats) => {

            if (newChats.replyTo) {

                if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType) {

                    setChats((prevState) => {

                        // Find the chat to update by its id
                        const updatedChats = prevState.map((chat) => {

                            if (chat.comments.length) {

                                const ids = chat.comments.map(x => x.id);

                                if (chat.id === newChats.replyTo || ids.includes(newChats.replyTo)) {

                                    return {

                                        ...chat,
                                        comments: [
                                            ...chat.comments,
                                            {
                                                id: newChats.id,
                                                userId: newChats.userId,
                                                commentText: newChats.text,
                                                userProfile: newChats.userProfile?.firstNameLastName,
                                                createdAt: newChats?.createDateTime
                                            },
                                        ],

                                    };

                                }

                            } else if (chat.id === newChats.replyTo) {

                                return {

                                    ...chat,
                                    comments: [
                                        ...chat.comments,
                                        {
                                            id: newChats.id,
                                            userId: newChats.userId,
                                            commentText: newChats.text,
                                            userProfile: newChats.userProfile?.firstNameLastName,
                                            createdAt: newChats?.createDateTime
                                        },
                                    ],

                                };

                            }

                        return chat;

                        });

                        return updatedChats;

                    })
                }

            } else {

                const chat = {
                    id: newChats?.id,
                    conversationId: newChats?.conversationId,
                    userId: newChats?.userId,
                    text: newChats.text,
                    contextType: newChats?.contextType,
                    comments: [],
                    userProfile: newChats?.userProfile?.firstNameLastName,
                    createdAt: newChats?.createDateTime
                };

                // conversationId === null && setConversationId(newChats?.conversationId);

                if(parseInt(contextId) === newChats.contextId && contextType === newChats.contextType)
                    setChats((prevState) => ([ ...prevState, chat ]))

            }

        }

        socket.on('new-conversation', handleConversation);

        return () => socket.off('new-conversation');

    }, [contextType, contextId, key]);

    const propsForChatBox = {
        chats, setChats, conversationId, setConversationId,
        contextId, contextType, key
    }

    return (
        <ChatBox { ...propsForChatBox } />
    )

}

export default ChatBox