import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import CalendarModal from "./calendar/CalendarModal";

import CalendarSideBar from "./calendar/CalendarSideBar";

import axios from "axios";
import { eventStyleGetter, getNestedElement } from "../../utils/CalendarController";
import { getOneCard } from "../../utils/QuoteSetting";
import { dateParsing } from "../../utils/DataParsing";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const CustomToolbar = ({ label, onNavigate, onView, onDrillDown }) => {

  const goToToday = () => {
    onNavigate("TODAY"); // 오늘 날짜로 이동
  };

  const goToNext = () => {
    onNavigate("NEXT"); // 다음 달로 이동
  };

  const goToPrev = () => {
    onNavigate("PREV"); // 이전 달로 이동
  };

  const switchToMonthView = () => {
    onView('month'); // 주 단위(view)로 전환
  };

  const switchToWeekView = () => {
    onView('week'); // 주 단위(view)로 전환
  };

  const switchToDayView = () => {
    onView('day'); // 날짜 단위(view)로 전환
  };

  const switchToAgendaView = () => {
    onView('agenda'); // 날짜 단위(view)로 전환
  };

  return (
    <div style={{width:'70vw', marginBottom:'10px'}}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={goToPrev}>{"<"}</button>
        <div onClick={goToToday} style={{ textAlign: "center" }}>
          <span>{label}</span>
        </div>
        <button onClick={goToNext}>{">"}</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={switchToMonthView}>Month</button>
        <button onClick={switchToWeekView}>Week</button>
        <button onClick={switchToDayView}>Day</button>
        <button onClick={switchToAgendaView}>Agenda</button>
      </div>
    </div>
  );
};

export default function MyCalendar() {
  const plannerList = useSelector( state => state.plannerList );
  const { home } = useSelector( state => state.calendar );
  const site = useSelector( state => state.site );
  const dispatch = useDispatch();

  const [events, setEvents] = useState();
  console.log(home)

  useEffect(()=>{
    const selectedEvents = getNestedElement(plannerList,home);
    setEvents(dateParsing(selectedEvents))
  },[ plannerList, home ])

  const onEventResize = (data) => {
    const { start, end, event } = data;

    dispatch(plannerListActions.updateCard({
      cardId: event.cardId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }))
  
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
          e.cardId === event.cardId ? { ...e, startDate:start, endDate:end } : e
      )
    );
  };
  
  const onEventDrop = (data) => {
    const { start, end, event } = data;

    dispatch(plannerListActions.updateCard({
      cardId: event.cardId,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }))
  
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
          e.cardId === event.cardId ? { ...e, startDate:start, endDate:end } : e
      )
    );
  };
  
  const onSelectSlot = (slotInfo) => {
    const cardStatus = home[1] ? ( home[1] === 0 ? "TODO" : ( home[1] === 1 ? "DOING" : "DONE" ) ) : "TODO"
    const newEvent = getOneCard(events.length,cardStatus)

    const startDate = moment(slotInfo.start).toDate();
    const endDate = moment(slotInfo.end).toDate()
    
    if(plannerList.length === 0){
      dispatch(plannerListActions.addPlanner(
        {
          plannerId: 0,
          title: "default title",
          cards: [[{...newEvent,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }],[],[]]
        }
      ))
    } else {
      dispatch(plannerListActions.addCard({
        plannerId: home[0],
        status: home[1] ? home[1] : 0,
        card: {...newEvent,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      }))
    }
    setEvents(prev => [...prev,{...newEvent,
      startDate,
      endDate,}]);
  };

  const onSelectEvent = (event, e) => {
    setSelectedCard(event);
    setVisible(true)
  };

  const [ selectedCard, setSelectedCard ] = useState(getOneCard(0,"TODO"));

  const [ visible, setVisible ] = useState(false);

  const testLogin = () => {
    const loginAxios = async () => {
      const result = await axios({
        method:"POST",
        url:"http://localhost:8080/api/postMember",
        data:{
          socialId:0,
          socialNickname:"aymrm",
        },
      })
      console.log("login",result)
    }
    loginAxios();
  }


  return (
    <>
      <CalendarSideBar/>
      {/* <button onClick={testLogin}>테스트 로그인</button> */}
      <CalendarModal
      selectedCard={selectedCard}
      modalStatus={visible}
      modalClose={()=>setVisible(false)}
      />
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        startAccessor="startDate"
        endAccessor="endDate"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        resizable
        selectable
        style={{ height: "100vh" }}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </>
  );
};

