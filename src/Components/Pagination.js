import React, { useState, useEffect ,useCallback} from 'react'
import Navigation from './Menu/Navigation';
import ReactPaginate from 'react-paginate';
import axios from 'axios';


const Pagination = () => {
    const [list,setList]=useState([])
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage,setItemPerPage] = useState(5)
    const [total,setTotal] = useState([])
    const [searchText,setSearchText] = useState('')
    const [filterData,setFilterData] = useState([])
     const [, updateState] = useState();
     const forceUpdate = useCallback(() => updateState({}), []);
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setList(filterData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(()=>{
    fetchData()
  },[])
  
  const fetchData = async () =>{
    const apiData = await axios.get(`https://registry.npmjs.org/-/v1/search?text=react-table&size=${100}&from=${0}`)
    console.log('apidata',apiData);
    const endOffset = itemOffset + itemsPerPage;
    // setList(apiData.data.objects)
    setList(apiData.data.objects.slice(itemOffset, endOffset));
    setTotal(apiData.data.objects)
    setFilterData(apiData.data.objects)
    // forceUpdate()
    setPageCount(Math.ceil(apiData.data.objects.length / itemsPerPage));
  }
  
  const handlePageClick = (event) =>{
    console.log('filterData',filterData);
    const newOffset = ((event.selected * itemsPerPage) % (filterData.length ))
    // setCurrentPage(event.selected)
    setItemOffset(newOffset);
  }
  
  const inputEvent =(e) =>{
    const {name , value} =e.target;
    setSearchText(value)
    setTimeout(()=>{
      const data= total.filter((item,i)=>{
        if(item.package.description.toLowerCase().includes(value)) return item
       })
       console.log('value',searchText);
     
       console.log('data',data);
       setFilterData(data)
       // setTotal(data)
       const endOffset = itemOffset + itemsPerPage;
       setList(data.slice(itemOffset, endOffset));
       setPageCount(Math.ceil(data.length / itemsPerPage));
      //  setCurrentPage(0)
    },3000)
  }
  const sortFun=(a, b)=> {
    if(a !== undefined && b !== undefined)
    {
        if (a.package.description < b.package.description) return -1;
        if (a.package.description > b.package.description) return 1;
        return 0;
    }
  }
  const handleSort =()=>{
    setList(list.sort(sortFun))
     forceUpdate()
  }
  
    return (
      <div className="App">
         <div className="jumbotron">
        <h1 className="display-4">
          <i class="material-icons brand-icon">User Data</i>
        </h1>
        <div class="input-group search_container w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Recipe..."
            value={searchText} name='searchText' onChange={inputEvent} /><i class="fa fa-search"></i>
          
        </div>
      </div>
        {console.log('sort',list)}
     
        <div className="container">
        <div className="row">

          <div className="col-12">
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
              {list && list.length > 0 && list.map((item,i)=>{
          return(
            <tr>
              <td>
              {item.package.description}
              </td>
            </tr>
            )
          })}
              </tbody>
              </table>
              </div>
             </div>
      
          <button className="btn btn-primary btn-block" onClick={handleSort}>sort</button>
          <div className='custom-pagination'>
          <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeClassName={"active"}
          // forcePage={currentPage}
        />
          </div>
          </div>
       
      </div>
    );
}

export default Pagination