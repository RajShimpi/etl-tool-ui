import react, { useState } from 'react';

const TabComponenet = (props) => {
    const [activeTab, setTab] = useState(props.tabList[0].id);
    return(
    <div className="row">
        <div className="col-md-12">
            <div className="tab-container">
                <ul className="tabs clearfix" >
                    {
                        props.tabList.map((item, key) => (
                            <li key={'li' + key} className={item.id === activeTab ? 'active li' : 'li'} onClick={(e) => setTab(item.id)}>
                                <a key={'a' + key} href={'#' + item.id}>{item.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="tab-content">
                {    
                    props.tabList.map((item, key) => (            
                    <div key={'div' + key} className={item.id === activeTab ? "tab-pane fade show active" : "tab-pane fade"} style={{ margin:'20px'}}>
                            {item.name}
                    </div>))
                }
            </div>
        </div>
    </div>)
}   

export default TabComponenet;