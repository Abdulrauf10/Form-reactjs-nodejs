import React, { useState, useEffect} from 'react';
import './SuperAdminDashboard.css'
import { useDispatch } from 'react-redux';
import { superAdminProtect, superAdminLogout } from '../api/Api';
import { unauthenticateSuperAdmin } from '../redux/slices/Slice';
// import ReactExport from 'react-data-export'

import { getAllParticipantApi, deleteParticipant } from '../api/Participant';

const SuperAdminDashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)
  const [participant, setParticipant] = useState()
  const [exporData, setExportData] = useState()

  const logout = async () => {
    try {
      await superAdminLogout()

      dispatch(unauthenticateSuperAdmin())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await superAdminProtect()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  });

  useEffect(() => {
    getAllParticipantApi()
    .then((res) =>{
      setParticipant(res)
    })
  }, [])

  const handleDateTruncation = (str) => {
        if(str !== null) {
            return str.substr(0, 10);
        } else {
            return "";
        }
  }

  const handleDelete = (id) => {
    deleteParticipant(id)
    .then(() =>{
      alert('data deleted successfully')
      document.location.reload(true)
    })
  }
  

  //export to excel
  //  const DataSet = [
  //       {
  //           columns: [
  //               {title: "Applied position", style: {font: {sz: "18", bold: true}}, width: {wpx: 70}}, // width in pixels
  //               {title: "Name", style: {font: {sz: "18", bold: true}}, width: {wch: 60}}, // width in characters
  //               {title: "Gender", style: {font: {sz: "18", bold: true}}, width: {wpx: 40}}, // width in pixels
  //               {title: "Date of birth", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
  //               {title: "Email", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
  //               {title: "Phone", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
  //               {title: "Address", style: {font: {sz: "18", bold: true}}, width: {wpx: 300}}, // width in pixels
  //               {title: "Domicile", style: {font: {sz: "18", bold: true}}, width: {wpx: 300}}, // width in pixels
  //               {title: "Education Level", style: {font: {sz: "18", bold: true}}, width: {wpx: 20}},
  //               {title: "Major", style: {font: {sz: "18", bold: true}}, width: {wpx: 70}}, // width in pixels
  //               {title: "University", style: {font: {sz: "18", bold: true}}, width: {wpx: 80}},
  //               {title: "Job Experience", style: {font: {sz: "18", bold: true}}, width: {wpx: 80}},
  //               {title: "Job type", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Years experience", style: {font: {sz: "18", bold: true}}, width: {wpx: 40}},
  //               {title: "Company", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Start date", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "End date", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Job Experience 2", style: {font: {sz: "18", bold: true}}, width: {wpx: 80}},
  //               {title: "Job type", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Years experience", style: {font: {sz: "18", bold: true}}, width: {wpx: 40}},
  //               {title: "Company", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Start date", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "End date", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}},
  //               {title: "Current salary", style: {font: {sz: "18", bold: true}}, width: {wpx: 50}},
  //               {title: "Expected salary", style: {font: {sz: "18", bold: true}}, width: {wpx: 50}}                
  //           ],
  //           data: exporData.map((data) => [
  //               {value: data.applied_position, style: {font: {sz: "14"}}},
  //               {value: data.name, style: {font: {sz: "14"}}},
  //               {value: data.gender, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.date_of_birth, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.email, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.phone, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.participant_address, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.domicile, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.education_level, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.major, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.university, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.job_expereince_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.job_experience_type_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.year_experience_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.company_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.start_date_position_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.end_date_position_1, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.job_expereince_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.job_experience_type_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.year_experience_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.company_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.start_date_position_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
  //               {value: data.end_date_position_2, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid"}}},
                
  //           ])
  //       }
  //   ]

  return (
    <div className='dashboard-admin'>
      {
        loading ? (
      <h1>Loading...</h1>
  ) : (
    <div>
      <h4>{protectedData}</h4>        
      <button onClick={() => logout()} className='btn btn-primary' type="button">logout</button> 
      
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th className='header-table' scope="col">Applied position</th>
            <th className='header-table' scope="col">Name</th>
            <th className='header-table' scope="col">Gender</th>
            <th className='header-table' scope="col">Date of birth</th>
            <th className='header-table' scope="col">Email</th>
            <th className='header-table' scope="col">Phone</th>
            <th className='header-table' scope="col">Address</th>
            <th className='header-table' scope="col">Domicile</th>
            <th className='header-table' scope="col">Education level</th>
            <th className='header-table' scope="col">Major</th>
            <th className='header-table' scope="col">University</th>
            <th className='header-table' scope="col">Job Experience 1</th>
            <th className='header-table' scope="col">Job type </th>
            <th className='header-table' scope="col">Years experience</th>
            <th className='header-table' scope="col">Company</th>
            <th className='header-table' scope="col">Start date</th>
            <th className='header-table' scope="col">End date</th>
            <th className='header-table' scope="col">Job Experience 2</th>
            <th className='header-table' scope="col">Job type </th>
            <th className='header-table' scope="col">Years experience</th>
            <th className='header-table' scope="col">Company</th>
            <th className='header-table' scope="col">Start date</th>
            <th className='header-table' scope="col">End date</th>
            <th className='header-table' scope="col">Current salary</th>
            <th className='header-table' scope="col">Expected salary</th>
            <th className='header-table' scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {participant?.map((dataPariticipant, index) => {
            return (
              <tr key={index}>
                <td className='body'>{dataPariticipant.applied_position}</td>
                <td className='body'>{dataPariticipant.participant_name}</td>
                <td className='body'>{dataPariticipant.gender}</td>
                <td className='body'>{handleDateTruncation(dataPariticipant.date_of_birth)}</td>
                <td className='body'>{dataPariticipant.email}</td>
                <td className='body'>{dataPariticipant.phone}</td>
                <td className='body'>{dataPariticipant.participant_address}</td>
                <td className='body'>{dataPariticipant.domicile}</td>
                <td className='body'>{dataPariticipant.education_level}</td>
                <td className='body'>{dataPariticipant.major}</td>
                <td className='body'>{dataPariticipant.university}</td>
                <td className='body'>{dataPariticipant.job_expereince_1}</td>
                <td className='body'>{dataPariticipant.job_experience_type_1}</td>
                <td className='body'>{dataPariticipant.year_experience_1}</td>
                <td className='body'>{dataPariticipant.company_1}</td>
                <td className='body'>{handleDateTruncation(dataPariticipant.start_date_position_1)}</td>
                <td className='body'>{handleDateTruncation(dataPariticipant.end_date_position_1)}</td>
                <td className='body'>{dataPariticipant.job_expereince_2}</td>
                <td className='body'>{dataPariticipant.job_experience_type_2}</td>
                <td className='body'>{dataPariticipant.year_experience_2}</td>
                <td className='body'>{dataPariticipant.company_2}</td>
                <td className='body'>{handleDateTruncation(dataPariticipant.start_date_position_2)}</td>
                <td className='body'>{handleDateTruncation(dataPariticipant.end_date_position_2)}</td>
                <td className='body'>{dataPariticipant.current_salary}</td>
                <td className='body'>{dataPariticipant.expected_salary}</td>
                <td className='body'><button onClick={() => handleDelete(dataPariticipant.id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
      }
    </div>
  )
}

export default SuperAdminDashboard