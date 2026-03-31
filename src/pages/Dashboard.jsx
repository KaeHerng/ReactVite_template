import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Tooltip from "../components/Tooltip";
import "../styles/Dashboard.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import OfferBarChart from "../components/charts/BarChart";
import OfferPieChart from "../components/charts/PieChart";
import { getStats } from "../utils/stats";
import { ExportReport } from "../api";
import Map from "../components/Map";
import ImageGrid from "../components/ImageGrid";

export default function Dashboard() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.currentUser);
  const [display, setdisplay] = useState(false);
  const [interviews, setInterviews] = useState([]);


  useEffect(() => {
    const saved = localStorage.getItem("interviews");
    
    if (saved) setInterviews(JSON.parse(saved));
  }, []);

  const interviewstats = getStats(interviews);

  console.log('interviewstats', interviews)

  const stats = [
    { title: "Users", value: "1,204", icon: "👥", action: () => alert("Go to Users page") },
    { title: "Revenue", value: "$12,430", icon: "💰", action: () => alert("View Revenue details") },
    { title: "Active", value: "87%", icon: "📈", action: () => alert("Check Active metrics") },
    { title: "Tasks", value: "23", icon: "📝", action: () => alert("View Tasks") },
  ];

  const bookings = [
    { id: 1, bookingStart: '10:00', bookingEnd: '11:00' },
    { id: 2, bookingStart: '12:00', bookingEnd: '13:00' }
  ];

  const timeSlots = [
    '06:00 - 06:30', '06:30 - 07:00', '07:00 - 07:30', '07:30 - 08:00', '08:00 - 08:30', '08:30 - 09:00', '09:00 - 09:30',
    '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00',
    '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30',
    '16:30 - 17:00', '17:00 - 17:30', '17:30 - 18:00', '18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00',
    '20:00 - 20:30', '20:30 - 21:00', '21:00 - 21:30', '21:30 - 22:00', '22:00 - 22:30', '22:30 - 23:00'
  ];

  // const arr = ["a","b","c","a","a","c","a","b","d","a","b","c","a","c","c","d"];
  // const [result, setResult] = useState(null);

  // const confirmQ2 = () => {
  //   const counts = arr.reduce((acc, char) => {
  //     acc[char] = (acc[char] || 0) + 1;
  //     return acc;
  //   }, {});

  //   console.log('counts', counts)

  //   {Object.entries(counts).map((key, value) => {
  //     console.log('Key =>', key[0], key[1])
  //     console.log('value =>', value)
  //   })}
  //   setResult(counts);
  // };

  const isSlotBooked = (slot) => {
    const [startTime, endTime] = slot.split(' - ');

    return bookings.some(booking => {
      const bookingStart = booking.bookingStart;
      const bookingEnd = booking.bookingEnd;

      // Check if slot falls within booking range
      return (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd);
    });
  };

  const handleClickME = () => {

    const arry = [3, 8, 100, 200, 522]

    const reducearry = arry.reduce((total, n) => total + n, 0);

    const cart = [
      {item: 'PS5', prices: 100, quantity: 3},
      {item: 'Iphone', prices: 100, quantity: 1},
      {item: 'T-shirt', prices: 100, quantity: 4},
    ]

    const carttotal = cart.reduce((total, c) => total + c.prices * c.quantity, 0)

    const people = [
      { name: "Tom", age: 18 },
      { name: "Jerry", age: 18 },
      { name: "Bob", age: 20 }
    ]

    const grouped = people.reduce((acc, p) => {
      acc[p.age] = acc[p.age] || []
      acc[p.age].push(p)
      return acc
    }, {})

    console.log('xx reducearry xx', reducearry)
    console.log('xx carttotal xx', carttotal)
    console.log('xx grouped xx', grouped)

    const forloop = ['10', '20', '30', '40', '50', '60', '70']

    for(let i = 0; i < forloop.length; i ++) {
      if (forloop[i] === '40') break

      console.log(forloop[i])
    }

    for (const item of forloop) {
      if (item === '40') break
      console.log('item', item)
    }

    const loopobj = [
      {name: 'chong', salary: 6500, senior: false },
      {name: 'leong', salary: 12000, senior: true },
      {name: 'alson', salary: 14000, senior: true },
      {name: 'Song', salary: 4500, senior: false },
      {name: 'kianheng', salary: 4600, senior: false },
    ]

    let pusharry = []
    let seniorarray = []

    for (let i = 0; i < loopobj.length; i ++) {
      if (loopobj[i].salary > 5000) {
        pusharry.push(loopobj[i])
      }
      if (loopobj[i].senior === true) {
        seniorarray.push(loopobj[i])
      }
    }

    const filterloop = loopobj.filter((item) => item.salary > 5000);
    const filtersenior = loopobj.filter((items) => items.senior === true);

    console.log('pusharry', pusharry, 'filter loop', filterloop)
    console.log('seniorarray', seniorarray,'filter senior', filtersenior)

    const anotherloop = [10, 20, 30, 40, 50, 60, 70]
    let total = 0
    const numberArr = []

    for (const numbers of anotherloop) {
      if (numbers > 40) {
        numberArr.push(numbers)
        total += numbers
      }
    }

    console.log('xx total xx', total)
    console.log('xx numberArr xx', numberArr)

    const anotherobg = [
      {name: 'chong', salary: 6500, senior: false },
      {name: 'leong', salary: 12000, senior: true },
      {name: 'alson', salary: 14000, senior: true },
      {name: 'Song', salary: 4500, senior: false },
      {name: 'kianheng', salary: 4600, senior: false },
    ]
    let totalsalary = 0
    let salaryarr = []

    for (const employee of anotherobg) {
      if (employee.salary > 5000) {
        salaryarr.push(employee)
        totalsalary += employee.salary
      }
    }

    console.log('xx totalsalary xx', totalsalary)
    console.log('xx salaryarr xx', salaryarr)

    const arr = [3, 1, 4, 2]
    arr.sort((a, b) => a - b) // 小到大 
    console.log(arr)

    arr.sort((a, b) => b - a) // 大到小
    console.log(arr)

    const smalltobig = [...anotherobg].sort((a, b) => a.salary - b.salary)
    const bigtosmall = [...anotherobg].sort((a, b) => b.salary - a.salary)
    const ascName = [...anotherobg].sort((a, b) => a.name.localeCompare(b.name))
    const descName = [...anotherobg].sort((a, b) => b.name.localeCompare(a.name))

    console.log('xx smalltobig =>', smalltobig)
    console.log('xx bigtosmall =>', bigtosmall)
    console.log('xx ascName =>', ascName)
    console.log('xx descName =>', descName)

    const list = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "drink", name: "cola" }
    ]
    const groupedxxx = list.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
  
      acc[item.type].push(item);
  
      return acc;
    }, {});
    
    console.log(groupedxxx);
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const ExportData = async () => {
    // return data to backend, backend will generate a file and return the file url, then frontend will download the file
    // here call backend api to export data and get the file url, then download the file
    try {
        alert("Exporting data...");

        const res = await ExportReport('excel', 'Interview Report', interviewstats);
      
        const fileUrl = res.file;

        console.log('fileUrl' , fileUrl)
        // const link = document.createElement("a");
        // link.href = fileUrl;
        // link.download = "Interview_Report.xlsx"; // 自定义名字
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);


      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    alert("Exporting data...")
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-banner">
        <h2 className="largeText">{t("dashboard.welcome")}, {user?.name || "Guest"}!</h2>
        <p>{t("dashboard.overview")}</p>
      </div>

      <div className="stats-container" style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <h2 className="stats-title">📊 Interview Stats</h2>
          <button className="buttonText buttondashboard" onClick={() => ExportData()}>Export Data</button>
        </div>
              
        {/* KPI CARDS */}
        <div className="stats-kpi-grid">
          <div className="kpi-card">
            <p>Total Applied</p>
            <h3>{interviewstats.total}</h3>
          </div>
              
          <div className="kpi-card">
            <p>Accepted</p>
            <h3>{interviewstats.accepted}</h3>
          </div>
              
          <div className="kpi-card">
            <p>Rejected</p>
            <h3>{interviewstats.rejected}</h3>
          </div>
              
          <div className="kpi-card">
            <p>Success Rate</p>
            <h3>
              {interviewstats.total
                ? ((interviewstats.accepted / interviewstats.total) * 100).toFixed(1)
                : 0}
              %
            </h3>
          </div>
        </div>
              
        {/* CHART GRID */}
        <div className="stats-chart-grid">
          <div className="chart-card">
            <h4>Offer Distribution</h4>
            <OfferBarChart stats={interviewstats} />
          </div>
              
          <div className="chart-card">
            <h4>Status Distribution</h4>
            <OfferPieChart stats={interviewstats} />
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <AnimatePresence>
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              className="dashboard-card"
              onClick={stat.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}>
              <div className="card-icon">{stat.icon}</div>
              <div className="card-title paragraph">{stat.title}</div>
              <div className="card-value largeText">{stat.value}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="dashboard-actions">
        <button className="buttonText buttondashboard" onClick={() => alert("Creating new report...")}>Create Report</button>
        <button className="buttonText buttondashboard" onClick={() => alert("Exporting data...")}>Export Data</button>
        <button className="buttonText buttondashboard" onClick={() => alert("Refreshing stats...")}>Refresh Stats</button>
      </div>
      <Tooltip text="This is a tooltip!">
        <div className="paragraph">try Hover ME !!!</div>
      </Tooltip>

      <div onMouseEnter={() => setdisplay(true)} onMouseLeave={() => setdisplay(false)} style={{ position: 'relative', marginTop: 30 }}>
        {display && <div className="paragraph" style={{ position: 'absolute', top: -20}}> this is tooltips !!!</div>}
        <div className="paragraph">Hover Me !!</div>
      </div>

      <div className="Gridcontainer2 paragraph" style={{ width: '100%' }}>
        <div style={{ padding: 5, border: '1px solid grey', borderRadius: 5 }}>Box 1</div>
        <div style={{ padding: 5, border: '1px solid grey', borderRadius: 5 }}>Box 2</div>
        <div style={{ padding: 5, border: '1px solid grey', borderRadius: 5 }}>Box 3</div>
        {/* <div style={{ padding: 5, border: '1px solid grey', borderRadius: 5 }}>Box 4</div>
        <div style={{ padding: 5, border: '1px solid grey', borderRadius: 5 }}>Box 5</div> */}
      </div>

      <div className="paragraph" style={{ border: '1px solid grey', borderRadius: 5, padding: 5 }} onClick={handleClickME}>Click Me</div>

      {/* 
            <button className="btn" onClick={confirmQ2}>
              Confirm
            </button>

            {result && (
              <div className="result">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            )} */}

      {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
        {timeSlots.map((row, rowIndex) => {
          const isBooked = isSlotBooked(row);
          return (
              <button
                key={row}
                onClick={() => toggleSlot(row)}
                disabled={isBooked}
                className={`
                          flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all
                          ${isBooked
                    ? 'bg-red-500 text-white opacity-100'
                    : 'bg-gray-800 text-gray-700 hover:bg-gray-400 cursor-pointer'
                  }
                        `}>
                {row}
              </button>
          )
        })}
      </div> */}
    </div>
  );
}
