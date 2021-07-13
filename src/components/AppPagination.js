import React, {useState, useEffect, createRef} from "react";
import _ from 'lodash';
import {Loader, Pagination, Table, Dimmer, Grid} from "semantic-ui-react";
import './AppPagination.css';
import {convertToPersianNumber} from "../utility/numberConverter";

import {createMedia} from "@artsy/fresnel";
import Responsive from "semantic-ui-react/dist/commonjs/addons/Responsive";

const {MediaContextProvider, Media} = createMedia({
    breakpoints: {
        zero: 0,
        sm: 400,
        md: 768,
        lg: 1024,
        xl: 1192,
    }
});

const SamplePagination = ({itemList, fetchPage, renderSmallDevices, renderHeaders, renderRows, pageCount, totalElements, search = ''}) => {
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    const [pageItems, setPageItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateTotalPages, setPaginateTotalPages] = useState(0);
    const [fetchSize, setFetchSize] = useState(100);
    const [perPage, setPerPage] = useState(10);
    const [counter, setCounter] =useState(0);
    const [loading, setLoading] = useState(true);
    const paginationRef  = createRef();


    useEffect(() => {
         fetchPage({page: 0 , size: fetchSize});
    },[]);



    useEffect(() => {
        if(itemList){
            const  filteredItems = itemList.filter((i) => {
                for(let k in i){
                    if(_.isPlainObject(i[k])) {
                        for (let key in i[k]){
                            if(i[k][key] !== null && !i[k][key].toString().toLowerCase().includes('id') && i[k][key].toString().trim().includes(search)) return true;
                        }
                    }
                    else if(i[k] && !k.toString().toLowerCase().includes('id') && i[k].toString().trim().includes(search)) return  true;
                }
                return  false;
            });
            setItems(filteredItems);
        }
    }, [itemList, search]);

    useEffect(() => {
        setPageItems(items.slice(offset, offset + perPage));
        if(!search)setPaginateTotalPages(Math.ceil( totalElements  / perPage));
        else {
            setCurrentPage(0);
            setPageItems(_.slice(items, 0, perPage ))
            setPaginateTotalPages(Math.ceil(_.size(items) / perPage))
        }
        setLoading(false);
    }, [items])

    const handlePageClick = (e, {activePage}) => {
        const selectedPage = activePage -1;
        if(selectedPage < 0) return ;
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setOffset(offset);
        const pageItems = _.slice(items, offset, offset+perPage);
        if(selectedPage < paginateTotalPages && pageItems.length === 0) {
            const page = Math.ceil(items.length / perPage);
            fetchPage({page: page , size: fetchSize});
            setLoading(true);
        }
        else setPageItems(pageItems);

    }





    const renderLoader = () => {
        return (
              <tr>
                  <td width={16} height={'200px'}>
                      <Dimmer    active inverted>
                          <Loader inline  size='medium'>در حال بارگیری</Loader>
                      </Dimmer>
                  </td>
              </tr>
        );
    }

    return (
        <React.Fragment  >
            <ResponsiveContainer key={'reponsive'} renderHeaders={renderHeaders} renderSmallDevices={renderSmallDevices} loading={loading}   renderLoader={renderLoader}  renderRows={renderRows} pageItems={pageItems}
                                      paginateTotalPages={paginateTotalPages}  handlePageClick={handlePageClick}  currentPage={currentPage}  paginationRef={paginationRef}  perPage={perPage}  totalElements={totalElements} />
        </React.Fragment>
    );
}

const  pageAttr = (paginateTotalPages) =>  {
    let showNav = paginateTotalPages > 1 ? undefined : null;
    let showFirstAndLast = paginateTotalPages > 2 ? undefined : null;
    return {showNav, showFirstAndLast};
}

const DesktopContainer = ({renderHeaders, loading,  renderLoader, renderRows, pageItems
                              , paginateTotalPages, handlePageClick, currentPage, paginationRef, perPage, totalElements}) => {
    let {showNav, showFirstAndLast} = pageAttr(paginateTotalPages);
    useEffect(() => {
        if (paginationRef.current) {
            const elements = document.querySelectorAll('.ui.pagination.menu .item');
            _.forEach(elements, (e, i) => e.innerHTML = convertToPersianNumber(e.innerHTML))
        }
    }, [paginationRef]);
    return (
        <React.Fragment  >
            <Table  celled textAlign={"left"}   structured   id={'pagination'}  compact   style={{margin: 'auto', marginTop: '10px', }}  >

                <Table.Header fullWidth>

                 {renderHeaders}

                </Table.Header>
                 <tbody>

                 {loading ? renderLoader() : renderRows(pageItems)}
                 </tbody>
                <tfoot >
                <Table.Row textAlign={"center"} >
                    <th    colSpan={'100%'} >
                        <Pagination
                            firstItem={showFirstAndLast}
                            lastItem={showFirstAndLast}
                            pageItem={showNav}
                            prevItem={showNav}
                            nextItem={showNav}
                            totalPages={paginateTotalPages}
                            onPageChange={handlePageClick}
                            activePage={currentPage + 1}
                            ref={paginationRef}
                        />
                    </th>
                    <th style={{border: '1px solid grey', fontSize: 'x-small'}}>
                        <span style={{color: '#778899',  }}>{(currentPage * perPage + pageItems.length).toLocaleString('fa')} از {totalElements.toLocaleString('fa')}</span>
                    </th>
                </Table.Row>

                </tfoot>
            </Table>
        </React.Fragment>
    );
}

const MobileContainer = ({renderSmallDevices, pageItems
                             , paginateTotalPages, handlePageClick, currentPage, paginationRef, perPage, totalElements}) => {
    let {showNav, showFirstAndLast} = pageAttr(paginateTotalPages);
    useEffect(() => {
        if (paginationRef.current) {
            const elements = document.querySelectorAll('.ui.pagination.menu .item');
            _.forEach(elements, (e, i) => e.innerHTML = convertToPersianNumber(e.innerHTML))
        }
    }, [paginationRef]);
    return (
        <div style={{marginTop: '7px'}} key={'mobile'} >

                {renderSmallDevices(pageItems)}

                        <Pagination
                            firstItem={showFirstAndLast}
                            lastItem={showFirstAndLast}
                            pageItem={showNav}
                            prevItem={showNav}
                            nextItem={showNav}
                            totalPages={paginateTotalPages}
                            onPageChange={handlePageClick}
                            activePage={currentPage + 1}
                            ref={paginationRef}
                        />
                        <span style={{color: '#778899',  }}>{(currentPage * perPage + pageItems.length).toLocaleString('fa')} از {totalElements.toLocaleString('fa')}</span>

        </div>
    );
}

const ResponsiveContainer = (props ) =>
     (
        <MediaContextProvider>
            <Media key={'xl'} greaterThanOrEqual={'md'}>
                <DesktopContainer {...props} />
            </Media>
            <Media key={'md'} lessThan={'md'}>
                <MobileContainer {...props} />
            </Media>
        </MediaContextProvider>
    );


export default SamplePagination;