// import React, { Component } from 'react';
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Navigation from '../Menu/Navigation';
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "#e9adad",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "#6035ef",
//   padding: grid,
//   width: 250,
// });
// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // items: getItems(10)
//       items:[
//         { id: '1',  title: 'quidem molestiae enim' },
//         { id: '2',  title: 'sunt qui excepturi placeat culpa' },
//         { id: '3',  title: 'omnis laborum odio' },
//         { id: '4',  title: 'non esse culpa molestiae omnis sed optio' },
//         { id: '5',  title: 'eaque aut omnis a' },
//         { id: '6',  title: 'natus impedit quibusdam illo est' },
//         { id: '7',  title: 'quibusdam autem aliquid et et quia' },
//         { id: '8',  title: 'qui fuga est a eum' },
//         { id: '9',  title: 'saepe unde necessitatibus rem' },
//         { id: '10',  title: 'distinctio laborum qui' },
//       ]
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }
//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }
//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     );

//     this.setState({
//       items
//     });
//   }

//   render() {
//     const {items } = this.state
//     return(
//       <>
//       <Navigation/>
//       <div style={{display:'flex'}}>
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                     {item.title}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       </div>
      
//       </>
//     );
//   }
// }
import React,{useState} from 'react';
import Navigation from '../Menu/Navigation';
import Board, { moveCard } from "@lourenci/react-kanban";
const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          // description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          // description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          // description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          // description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          // description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          // description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          // description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          // description: "Card content"
        }
      ]
    },
    {
      id: 5,
      title: "Production",
      cards: [{}, {}]
    }
  ]
};

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}

function UncontrolledBoard() {
  return (
    <>
    <div className='daya'>
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
    
      initialBoard={board}
      allowAddCard={{ on: "bottom" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard
      })}
      onCardNew={console.log}
    />
     <div className='react-kanban-column'>
      <div className='react-kanban-column-header'>static</div>
      <button className='react-kanban-card-adder-button'>+</button>
      <div className='react-kanban-card '><span> <div className='react-kanban-card__title'><span>Card title 9</span><span>X</span></div></span></div>
    </div>
    </div>
    </>
  );
}

function Staticdata() {
  return(
    <>
    <div className='react-kanban-column'>
      <div className='react-kanban-column-header'>static</div>
      <button className='react-kanban-card-adder-button'>+</button>
      <div className='react-kanban-card '><span> <div className='react-kanban-card__title'><span>Card title 9</span><span>X</span></div></span></div>
    </div>
    </>
  )
}

function Home() {
  return (
    <>
    <Navigation/>
      <h4>Example of React drag and drop</h4>
      <UncontrolledBoard />
      <Staticdata/>
      <h4>Example of a controlled board</h4>
      <p>Just the card moving is implemented in this demo.</p>
      <p>
        In this kind of board, you can do whatever you want. We just mirror your
        board state.
      </p>
      <ControlledBoard />
    </>
  );
}


// export default Home;
// import React ,{useState,useEffect}from 'react'
// import ReactQuill from "react-quill";
// import { useQuill } from 'react-quilljs';

// import 'quill/dist/quill.snow.css';
// import { Emoji } from 'emoji-mart'
// import Quill from 'quill';
// import 'quill-mention';
// import "quill-mention/dist/quill.mention.css";
// import TurndownService from 'turndown';
// import Navigation from '../Menu/Navigation';
// import converter from 'html-to-markdown'

// const Home = () => {
 
//   const [sendData, setSendData] = useState([])
//   const [mentionData, setMentionData] = useState()
//   const [showData, setShowData] = useState()
//   var turndownService = new TurndownService()
//   turndownService.addRule('strikethrough', {
//     filter: ['del', 's', 'strike'],
//     replacement: function (content) {
//       return '~' + content + '~'
//     }
//   })
//   turndownService.addRule('heading', {
//     filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
//     replacement: function (content, node, options) {
//       console.log(node.tagName.charAt(1), '::::');
//       var hPrefix = '';
//       var hLevel = node.tagName.charAt(1)
//       for (var i = 0; i < hLevel; i++) {
//         hPrefix += '#'
//       }
//       return '\n' + hPrefix + ' ' + node.innerHTML + '\n\n';
//       // return converter.convert(node.outerHTML)
//     }
//   })
//   turndownService.addRule('emphasis', {
//     filter: ['em', 'i'],
//     replacement: function (content, node, options) {
//       return '*' + content + '*'
//     }
//   })
//   turndownService.addRule('span', {
//     filter: ['span'],
//     replacement: function (content, node, options) {
//       const mention_char = node.getAttribute('data-denotation-char')
//       const mention_id = node.getAttribute('data-id')
//       const mention_value = node.getAttribute('data-value')
//       return '<' + mention_char + mention_id + '|' + mention_value + '>'
//     }
//   })

//   // const { quill, quillRef } = useQuill();
//   const theme = 'snow';
//   // const theme = 'bubble';
//   const atValues = [
//     { id: 1, value: "abc" },
//     { id: 2, value: "xyz" }
//   ];
//   const hashValues = [
//     { id: 3, value: "Fredrik Sundqvist 2" },
//     { id: 4, value: "Patrik Sjölin 2" }
//   ];
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike', 'link', 'code-block'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     ],
//     markdown: true,
//     mention: {
//       allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
//       mentionDenotationChars: ["@", "#"],
//       source: function (searchTerm, renderList, mentionChar) {
//         let values;

//         if (mentionChar === "@") {
//           values = atValues;
//         } else {
//           values = hashValues;
//         }

//         if (searchTerm.length === 0) {
//           renderList(values, searchTerm);
//         } else {
//           const matches = [];
//           for (let i = 0; i < values.length; i++)
//             if (
//               ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
//             )
//               matches.push(values[i]);
//           renderList(matches, searchTerm);
//         }
//       }
//     }
//   };

//   const placeholder = 'Type a message...';

//   const formats = ['bold', 'italic', 'underline', 'strike', 'list', 'link', 'code-block', 'mention', 'markdown', 'header','code'];

//   const { quill, quillRef, Quill } = useQuill({ theme, modules, formats, placeholder });
//   if (Quill && !quill) { // For execute this line only once.
//     // const quillMarkdown = new QuillMarkdown(quill,markdownOptions)
//     const quillMarkdown = require('quilljs-markdown').default;
//     Quill.register('modules/markdown', quillMarkdown);
//     const quillMentions = require('quill-mention').default;
//     Quill.register('modules/mention', quillMentions);
//   }
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     if (quill) {
//       quill.on('text-change', (delta, oldDelta, source) => {
//         // // debugger
//         // const removeHeader=quill.getContents().ops.map((item,i)=>{
//         //    return (item.attributes?.header ? '' : item)
//         // })
//         // console.log('removeHeader',removeHeader);
//         // quill.setContents(removeHeader)
//         console.log('Text change!', delta, oldDelta, source);
//         console.log(quill.getText()); // Get text only
//         console.log(quill.getContents()); // Get delta contents.
//         console.log(quill.root.innerHTML); // Get innerHTML using quill
//         console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
//       });
//     }
//   }, [quill]);

//   const getData = (e) => {
//     //   const list=[]
//     //   quill.getContents().ops.map((item,i)=>{
//     //       if(item.insert?.mention){
//     //         console.log('delta',item);
//     //         list.push(item)
//     //     }
//     //   })
//     // setMentionData(list)
//     setShowData(quill.getContents())
//     console.log('html', quill.root.innerHTML);
//     var markdown = turndownService.turndown(quill.root.innerHTML)
//     setContent(markdown);
//     quill.root.innerHTML = '';
//   };
//   const setData = (e) => {
//     quill.setContents(showData)
//   };

//   const renderData = () => {
//     let data = [];
//     let list = [];
//     let NumList=[]
//     var inx = 1
//     content.split('').forEach((e, i) => {
//       // if(e === '<') {
//       if (e === '@') {
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var newObj = {
//           id: str.substring(str.indexOf('@') + 1, str.indexOf('|')).trim(),
//           value: str.substring(str.indexOf('|') + 1, str.indexOf('>')),
//           sign: e
//         }
//         data.push(newObj)
//       }
//       else if (e === '#') {
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         if (content[i - 1] === '<') {
//           var newObj = {
//             id: str.substring(str.indexOf('#') + 1, str.indexOf('|')).trim(),
//             value: str.substring(str.indexOf('|') + 1, str.indexOf('>')),
//             sign: e
//           }
//           data.push(newObj)
//         } else {
//           if (content[i + 1] === ' ') {
//             var endString = str.indexOf('\n') !== -1 ? str.indexOf('\n') : str.length
//             var newObj = {
//               id: '',
//               value: str.substring(str.indexOf('#') + 1, endString).trim(),
//               header: inx,
//               sign: ''
//             }
//             inx = 1
//             data.push(newObj)
//           } else {
//             inx++
//           }

//           //REgex
//           // var str = content.substring(i,content.length)
//           // var res =  str.replace(/^# (.*$)/gim, '<h1>$1</h1>')?.match(/<h1>(.*?)<\/h1>/g)?.map(function(val){
//           //   return val.replace(/<\/?h1>/g,'');
//           // })
//           // var newObj = {
//           //   id:'',
//           //   value:res[0],
//           //   sign:'h1',
//           //   url:''
//           // }
//           // data.push(newObj)
//           // console.log('header' ,res,str);
//         }
//       }
//       else if (e === '[') {
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var newObj = {
//           id: '',
//           value: str.substring(str.indexOf('[') + 1, str.indexOf(']')),
//           sign: '',
//           url: str.substring(str.indexOf('(') + 1, str.indexOf(')'))
//         }
//         data.push(newObj)
//       }
//       else if (e === '*' && content[i + 1] === '*' && content[i + 2] !== undefined && content[i + 2] !== '\n') {
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var res = str.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')?.match(/<b>(.*?)<\/b>/g)?.map(function (val) {
//           return val.replace(/<\/?b>/g, '');
//         })
//         str = content.substring(i, res[0].length + 2)
//         var newObj = {
//           id: '',
//           value: res[0],
//           sign: '',
//           url: '',
//           bold: 'bold'
//         }
//         data.push(newObj)
//         console.log('bold', res, str);
//       }
//       else if (e === '*' && content[i - 1] !== '*' && content[i + 1] !== '*' && content[i + 1] !== undefined && content[i + 1] !== '\n' && content[i + 1] !== ' ') {
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var res = str.replace(/\*(.*)\*/gim, '<i>$1</i>')?.match(/<i>(.*?)<\/i>/g)?.map(function (val) {
//           return val.replace(/<\/?i>/g, '');
//         })
//         var newObj = {
//           id: '',
//           value: res[0],
//           sign: '',
//           url: '',
//           italic: 'italic'
//         }
//         data.push(newObj)
//         console.log('italic', res, str);
//       }
//       else if (e === '*' && content[i + 1] === ' ' && content[i - 1] !== '*' && content[i + 1] !== '*') {
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var substr = str.indexOf('\n') !== -1 ? str.substring(str.indexOf(' '), str.indexOf('\n')).trim() : str.substring(str.indexOf(' '), str.length).trim()
//         list.push(substr)
//         var newObj = {
//           id: '',
//           value: list,
//           sign: '',
//           url: '',
//           list: 'bulletList'
//         }
//         data.push(newObj)
//         console.log('list', list, str);
//       }
//       else if(e.match(/\d/i) && content[i+1] !== '|'){
//         console.log('number list');
//         list=[]
//         var str = content.substring(i, content.length)
//         var substr = str.indexOf('\n') !== -1 ? str.substring(str.indexOf(' '), str.indexOf('\n')).trim() : str.substring(str.indexOf(' '), str.length).trim()
//         NumList.push(substr)
//         var newObj = {
//           id: '',
//           value: NumList,
//           sign: '',
//           url: '',
//           list: 'numberList'
//         }
//         data.push(newObj)
//         console.log('number-list', NumList, str);
//       }
//       else if(e === '~'){
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var res = str.replace(/\~(.*)\~/gim, '<s>$1</s>')?.match(/<s>(.*?)<\/s>/g)?.map(function (val) {
//           return val.replace(/<\/?s>/g, '');
//         })
//         var newObj = {
//           id: '',
//           value: res && res[0],
//           sign: '',
//           url: '',
//           italic: '',
//           strike:true
//         }
//         data.push(newObj)
//         console.log('strike', res, str);
//       }
//       else if(e === '`'){
//         list = []
//         NumList=[]
//         var str = content.substring(i, content.length)
//         var res = str.replace(/\`(.*)\`/gim, '<code>$1</code>')?.match(/<code>(.*?)<\/code>/g)?.map(function (val) {
//           return val.replace(/<\/?code>/g, '');
//         })
//         var newObj = {
//           id: '',
//           value: res && res[0],
//           sign: '',
//           url: '',
//           italic: '',
//           strike:false,
//           code:true
//         }
//         data.push(newObj)
//         console.log('code', res, str);
//       }
//       // }
//     })
//     console.log("data", data)
//     const unique = [...new Map(data.map(item => [item.value, item])).values()];
//     console.log("unique", unique)
//     setSendData(unique)
//   }

//   const popupOpen = (user) => {
//     alert(`user name:${user.value}
// user id:${user.id}`)
//   }

//   // const renderUsingRegex=(markdownText)=>{
//   //   const htmlText = markdownText
//   //   .replace(/^### (.*$)/gim, '<h3>$1</h3>')
//   //   .replace(/^## (.*$)/gim, '<h2>$1</h2>')
//   //   .replace(/^# (.*$)/gim, '<h1>$1</h1>')
//   //   .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
//   //   .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
//   //   .replace(/\*(.*)\*/gim, '<i>$1</i>')
//   //   .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
//   //   .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
//   //   .replace(/\n$/gim, '<br />')

//   // // return htmlText.trim()
//   // console.log('html',htmlText.trim());
//   // setSendData(htmlText.trim())
//   // }

//   return (
//     <div style={{ width: 1000, height: 'auto' }}>
//       <div ref={quillRef} />
//       <button type='button' onClick={getData}>getData</button>
//       <button type='button' onClick={setData}>setData</button>
//       <button onClick={renderData}>Send Data</button>
//       {console.log('content', content)}
//       <div
//         className='ql-editor'
//         dangerouslySetInnerHTML={{ __html: content }}
//         style={{ overflowY: 'none', height: 'auto' }}
//       />
//       <h3>output:</h3>
//       <div style={{ margin: '20px' }}>{sendData && sendData.map((item) => {
//         return (
//           <>
//             {item.sign && item.sign !== undefined && <><span onClick={() => popupOpen(item)}> {item.sign} {item.value}</span><br /></>}
//             {item.header !== undefined ? item.header === 1 ? <h1>{item.value}</h1> : item.header === 2 ? <h2>{item.value}</h2> : item.header === 3 ? <h3>{item.value}</h3> : item.header === 4 ? <h4>{item.value}</h4> : item.header === 5 ? <h5>{item.value}</h5> : <h6>{item.value}</h6> : ''}
//             {item.url && item.url !== undefined && <a href={item.url}>{item.value}</a>}
//             {item.bold === 'bold' && <><b>{item.value}</b> <br /></>}
//             {item.italic === 'italic' && <><i>{item.value}</i><br /></>}
//             {item.list === 'bulletList' && <><ul>{item.value.map((n) => {
//               return <li style={{ width: '0px' }}>{n}</li>
//             })}</ul></>}
//             {item.list === 'numberList' && <><ol>{item.value.map((n) => {
//               return <li style={{ width: '0px' }}>{n}</li>
//             })}</ol></>}
//             {item.strike && <s>{item.value}</s>}
//             {item.code && <code>{item.value}</code>}
//           </>
//         )
//       })}</div>
//     </div>
//   );

// }

export default Home;
