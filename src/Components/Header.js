// import React ,{useEffect,useState}from 'react';
// import Navigation from './Menu/Navigation';
// import Axios from 'axios'

// const Header = (props) => {
//   // const { search, onInputChange, onSearchClick } = props;
//   const[search,setSearch]=useState('panner');
//   const [recipes, setRecipes] = useState([]);


//   const APP_ID = "eff7d929"
//   const APP_KEY = "b0a6b7bc034a76e17cdeeb761d86b9bc";

//   useEffect(() => {
//     getRecipes();
//   }, []);

//   const getRecipes = async () => {
//     const res = await Axios.get(
//       `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
//     );
//     setRecipes(res.data.hits);
//   };
//   const onInputChange=(e)=>{
//     setSearch(e.target.value)
//   }


//   const onSearchClick = () => {
//     getRecipes();
//   };
//   return (
//       <>
//       <Navigation/>
//       <div className="jumbotron">
//       <h1 className="display-4">
//         <i class="material-icons brand-icon">fastfood</i> Food Recipe
//       </h1>
//       <div class="input-group w-50 mx-auto">
//         <input
//           type="text"
//           class="form-control"
//           placeholder="Search Your Recipe..."
//           value={search}
//            onChange={onInputChange}
//         />
//         <div class="input-group-append">
//           <button className="btn btn-primary btn-block" onClick={onSearchClick}>
//             Search Recipe
//           </button>
//         </div>
//       </div>
//     </div>

//     <div className="container ">


//     <div className="row  text-center mt-5 pt-5">

//     {recipes.map(recipe => (
//          <div class="col-md-3">
//               <div class="card  py-2 text-center">
//         <img src={recipe.recipe.image} className="img-fluid w-50 mx-auto rounded-circle" />
//         <div class="card-body">
//           <h5>{recipe.recipe.label}</h5>
//         </div>
//         {/* <ul class="list-group list-group-flush">
//           {recipe.recipe.ingredientLines.map(ingredient => (
//             <li className="list-group-item">{ingredient}</li>
//           ))}
//         </ul> */}
//       {console.log("recipes",recipes)}
//       </div>
//       {/* <RecipeItem
//         key={Math.random() * 100}
//         name={recipe.recipe.label}
//         image={recipe.recipe.image}
//         ingredientLines={recipe.recipe.ingredientLines}
//       /> */}
//       </div>
//     ))}

//   </div>
//             </div>
//     </>
//   )
// }

// export default Header



import React, { useEffect, useState } from 'react';
import Navigation from './Menu/Navigation';
import Axios from 'axios'
import Recipes from './Recipes';
import {MDBAccordionItem, MDBBtn, MDBPagination,MDBPaginationItem,MDBPaginationLink} from 'mdb-react-ui-kit'

const Header = (props) => {
  // const { search, onInputChange, onSearchClick } = props;
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [sortValue,setSortValue]=useState('')
  const [currentPage,setCurrentPage]=useState(0)
  const [pageLimit]=useState(4)
  const[sortFilter,setSortFilter]=useState('')
  const [operation,setOperation]=useState('')
const sortOptions = ['name','username','email'];

  useEffect(() => {
    getRecipes(0,4,0);
  }, []);

  const getRecipes = async (start,end,increas,otpType,filterOrSortType) => {
   switch(otpType){
     case 'search':
       setOperation(otpType);
       setSortValue("");
         return await Axios.get(
      `https://jsonplaceholder.typicode.com/users?q=${value}&_start=${start}&_end=${end}`
    ).then((res) =>{setData(res.data);setCurrentPage(currentPage + increas); setValue('')})
     .catch((err) => console.log(err));
     case "sort": 
       setOperation(otpType);
       setSortFilter(filterOrSortType)
       return await Axios.get(
        `https://jsonplaceholder.typicode.com/users?_sort=${filterOrSortType}&_order=asc&_start=${start}&_end=${end}`
      ).then((res) =>{setData(res.data);setCurrentPage(currentPage + increas);})
       .catch((err) => console.log(err))
        ;
      default:
   
    return await Axios.get(
      `https://jsonplaceholder.typicode.com/users?_start=${start}&_end=${end}`
    ).then((res) => {setData(res.data); setCurrentPage(currentPage + increas)}).catch((err) => console.log(err))
    }   
  };
  const onInputChange = (e) => {
    setValue(e.target.value)
  }


  const onSearchClick = async(e) => {
    e.preventDefault();
    getRecipes(0,4,0,"search")
    // return await Axios.get(
    //   `https://jsonplaceholder.typicode.com/users?q=${value}`
    // ).then((res) =>{setData(res.data); setValue('')})
    //  .catch((err) => console.log(err))
    //   ;
  };

  const handleSort = async(e) => {
    debugger
    let value=e.target.value;
    setSortValue(value)
    getRecipes(0,4,0,"sort",value)
    // return await Axios.get(
    //   `https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`
    // ).then((res) =>{setData(res.data);})
    //  .catch((err) => console.log(err))
    //   ;
  };
  const renderPagination=()=>{
    if(data.length <4 && currentPage ===0) return null
    if(currentPage ===0){
      return(
<MDBPagination className='mb_0'>
  <MDBPaginationItem>
    <MDBPaginationLink>1</MDBPaginationLink>
  </MDBPaginationItem>
  <MDBPaginationItem>
    <MDBBtn onClick={()=>getRecipes(4,8,1,operation,sortFilter)}>Next</MDBBtn>
  </MDBPaginationItem>
  </MDBPagination>
      );
    }
    else if(currentPage <pageLimit-1 && data.length ===pageLimit){
      return(<MDBPagination className='mb_0'>
      
     <MDBPaginationItem>
        <MDBBtn onClick={()=>getRecipes((currentPage -1)*4 ,currentPage *4 ,-1,operation,sortFilter)}>Prev</MDBBtn>
      </MDBPaginationItem>
     
    
      <MDBPaginationItem>
      <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
      </MDBPaginationItem>
    
      <MDBPaginationItem>
        <MDBBtn onClick={()=>getRecipes((currentPage + 1)*4 ,(currentPage +2)*4 ,1,operation,sortFilter)}>Next</MDBBtn>
      </MDBPaginationItem>
     
      </MDBPagination>)
    }
    else{
      return(
        <MDBPagination className='mb_0'>
  <MDBPaginationItem>
  <MDBBtn onClick={()=>getRecipes((currentPage -1)*4 ,currentPage *4 ,-1,operation,sortFilter)}>Prev</MDBBtn>
  </MDBPaginationItem>
  <MDBPaginationItem>
    <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
  </MDBPaginationItem>
  </MDBPagination>
      )
    }
  }
  return (
    <>
      <Navigation />
      <div className="jumbotron">
        <h1 className="display-4">
          <i class="material-icons brand-icon">User Data</i>
        </h1>
        <div class="input-group w-50 mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Search Your Recipe..."
            value={value}
            onChange={onInputChange}
          />
          <div class="input-group-append">
            <button className="btn btn-primary btn-block" onClick={onSearchClick}>
              Search Recipe
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-12">
            <table class="table">
              <thead class="thead-light">
                <tr>    <div>
          <h5>Sort By:</h5>
          <select style={{width:"50%",borderRadius:'2px',height:'35px'}} onChange={handleSort} value={sortValue}>
          <option>Please Select Value</option>
          {sortOptions.map((item,index)=>{
           return(<option value={item} key={index}>{item}</option>)
            
          })}
          </select>
        </div></tr>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                
                </tr>
              </thead>

              {data.length === 0 ? (
                <tbody><tr>
                  <td>No Data Found</td>
                </tr></tbody>) :
                (<tbody>
                  {data?.map((data, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                      </tr>
                    )
                  })}
                </tbody>)}
                
            </table>
            <div style={{margin:"auto",padding:"15px",maxWidth:"200px",alignContent:"center"}}> {renderPagination()}</div>
          </div>
        </div>
    
      </div>
    </>
  )
}

export default Header