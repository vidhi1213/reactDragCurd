

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import dataSource from '../datasource1.json';
import { extend } from '@syncfusion/ej2-base';
import moment from 'moment';
import { Week, Month, TimelineViews, TimelineMonth, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject } from '@syncfusion/ej2-react-schedule';
export default class Schedulecal extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
           
            isFavorite:false
          };
        this.conferenceData = [
            { Text: 'Feature Film', Id: 1, Color: '#08F7B8' },
            { Text: 'New Frontier', Id: 2, Color: '#00B2C0' },
            { Text: 'Short Film Programs', Id: 3, Color: '#FED105' },
            { Text: 'Indie Episodic Programs', Id: 4, Color: '#e74c4c' },
            // { Text: 'Beyond Film', Id: 3, Color: '#FED105' },
            // { Text: 'Partner Events', Id: 4, Color: '#e74c4c' }
        ];
        this.data = extend([], dataSource.calendarData, null, true);
        // this.data = [
        //     {
        //         Id: 1,
        //         Subject: 'Burning Man',
        //         StartTime: new Date(2018, 5, 1, 15),
        //         EndTime: new Date(2018, 5, 1, 19),
        //         ConferenceId: [1, 2, 3,4]
        //     }, {
        //         Id: 2,
        //         Subject: 'Data-Driven Economy',
        //         StartTime: new Date(2018, 5, 1, 14),
        //         EndTime: new Date(2018, 5, 1, 24),
        //         ConferenceId: [1, 2]
        //     }, {
        //         Id: 3,
        //         Subject: 'Techweek',
        //         StartTime: new Date(2018, 5, 2, 15),
        //         EndTime: new Date(2018, 5, 2, 17),
        //         ConferenceId: [2, 3]
        //     }, {
        //         Id: 4,
        //         Subject: 'Content Marketing World',
        //         StartTime: new Date(2018, 5, 2, 18),
        //         EndTime: new Date(2018, 5, 2, 20),
        //         ConferenceId: [1,2, 3]
        //     }, {
        //         Id: 5,
        //         Subject: 'B2B Marketing Forum',
        //         StartTime: new Date(2018, 5, 3, 18),
        //         EndTime: new Date(2018, 5, 3, 20),
        //         ConferenceId: [1, 2, 3]
        //     }
        // ];
    }

    btnclick = () => {
        
        this.setState({isFavorite:!this.state.isFavorite})
    }
   
    setHeight = () => {
        document.querySelectorAll('.e-resource-column-table tr').forEach((item, i) => {
            document.querySelectorAll('.e-content-table tr').forEach((item2, j) => {
                if(i === j) {
                    console.log(">>", item2,item2.firstChild)
                    item2.style.minHeight = item.clientHeight + 'px'
                    item2.firstChild.style.height = item.clientHeight + 'px'
                }
            })
        })
        // document.querySelectorAll('.resource').forEach((item) => {
        //   item.style.minHeight = (item.clientHeight + 150) + 'px';
        // })
        // document.querySelectorAll('e-work-cells').forEach((item) => {
        //   item.style.minHeight = (item.clientHeight + 150) + 'px';
        // })
        // console.log("::::::::::::rrrrrrrrrrrrr",document.querySelectorAll('.e-work-cells'));
      }  
      componentDidMount() {
        setTimeout(() => {
        //   this.setHeight()
        },1000)
        
      }
    getDoctorName(value) {
        
        return ((value.resourceData) ?
            value.resourceData.Text :
            value.resourceName);
    }
    getDoctorLevel(value) {
        let resourceName = this.getDoctorName(value);
        return (resourceName =="Feature Film" ||'New Frontie' ||'Short Film Programs' ||'Indie Episodic Programs'||'Beyond Film'||'Partner Events') && 'A showcase of world premieres of some of the most highly anticipated fiction and nonfiction films of the coming year. ' 
        // return (resourceName === 'Margaret') ? 'A showcase of world premieres of some of the most highly anticipated fiction and nonfiction films of the coming year. ' : (resourceName === 'Robert') ? 'Neurologist' : 'Orthopedic Surgeon';
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap">
        <div className="resource-detail"><h3 className="resource-name">{this.getDoctorName(props)}</h3>
        <span className="resource-designation">{this.getDoctorLevel(props)}</span></div></div>);
    }
    eventTemplate(props) {
        // console.log('props', props);
        return (
            <>
                <div>
                    <div className="template-wrap" >
                    {/* <div>{moment(props.start).tz(moment.tz.guess()).format('hh:mm A z')}</div> */}
                    <div style={{display:'flex'}}>
                        <span className="subject" >{props.Subject}</span>
                         <button type='button' onClick={this.btnclick.bind(this)}>{this.state.isFavorite ?<span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.28V6.72H6.792V12H5.232V6.72H0V5.28H5.232V0H6.792V5.28H12Z" fill="black" />
                        </svg>
                        </span>:<span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.28V6.72H6.792V12H5.232V6.72H0V5.28H5.232V0H6.792V5.28H12Z" fill="black" />
                        </svg>
                        </span>} {this.state.isFavorite ? 'favorited' : 'favorite'}</button>
                    </div>
                        <h4 className='time' >time</h4>
                    </div>
                    <div>
                    
                    </div>
                </div></>)
    }
   
    render() {
        return (
            <div className='col-md-12'>
                <ScheduleComponent  resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} rowAutoHeight={true} width='100%' height='700px' selectedDate={new Date(2022, 5, 3)} currentView='TimelineWeek' eventSettings={{ dataSource: this.data }} group={{ allowGroupEdit: true, resources: ['Conferences'] }}>

                    <ViewsDirective  >
                        {/* <ViewDirective option='Week'/> */}
                        <ViewDirective option='TimelineWeek' timeScale={{ enable: true, slotCount: 1 }} startHour='04:00' endHour='23:00' eventTemplate={this.eventTemplate.bind(this)} />
                        {/* <ViewDirective option='TimelineMonth'/> */}

                    </ViewsDirective>
                    <ResourcesDirective>
                        <ResourceDirective field='ConferenceId' title='Conference' name='Conferences' allowMultiple={true}  dataSource={this.conferenceData} textField='Text' idField='Id' colorField='Color'>
                        </ResourceDirective>
                    </ResourcesDirective>
                    <Inject services={[Week, TimelineViews, TimelineMonth]} />
                </ScheduleComponent>
            </div>
        );
    }
}
;


