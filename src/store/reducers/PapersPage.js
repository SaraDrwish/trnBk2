import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaper,
  editPaper,
  deletePaper,
} from "../redux/reducers/papersSlice";

const PapersPage = ({ serviceId }) => {
  const dispatch = useDispatch();
  const papers = useSelector((state) => state.papers);
  const [newPaper, setNewPaper] = useState("");

  const handleUpload = () => {
    const uploadedPaper = {
      id: serviceId,
      document: newPaper,
      status: "uploaded",
    };
    dispatch(addPaper(uploadedPaper));
    setNewPaper("");
  };

  const handleEdit = () => {
    const editedPaper = { id: serviceId, document: newPaper, status: "edited" };
    dispatch(editPaper({ id: serviceId, updatedData: editedPaper }));
    setNewPaper("");
  };

  const handleDelete = () => {
    dispatch(deletePaper(serviceId));
  };

  return (
    <div>
      <h2>Papers for Service ID: {serviceId}</h2>
      {papers.map((paper) => (
        <div key={paper.id}>
          <p>{paper.document}</p>
          {paper.status === "uploaded" && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      ))}
      <div>
        <input
          type="text"
          value={newPaper}
          onChange={(e) => setNewPaper(e.target.value)}
        />
        <button onClick={handleUpload}>Upload Paper</button>
      </div>
    </div>
  );
};

export default PapersPage;

// /////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPaper, editPaper, deletePaper } from '../redux/reducers/papersSlice';

// const PapersPage = ({ serviceId }) => {
//   const dispatch = useDispatch();
//   const papers = useSelector((state) => state.papers);
//   const [newPaper, setNewPaper] = useState('');

//   const handleUpload = () => {
//     // Simulate uploading logic (replace with actual logic)
//     const uploadedPaper = { id: serviceId, document: newPaper, status: 'uploaded' };
//     dispatch(addPaper(uploadedPaper));
//     setNewPaper('');
//   };

//   const handleEdit = (paperId) => {
//     // Simulate editing logic (replace with actual logic)
//     const editedPaper = { document: newPaper, status: 'edited' };
//     dispatch(editPaper({ id: paperId, updatedData: editedPaper }));
//     setNewPaper('');
//   };

//   const handleDelete = (paperId) => {
//     // Simulate deleting logic (replace with actual logic)
//     dispatch(deletePaper(paperId));
//   };

//   return (
//     <div>
//       <h2>Papers for Service ID: {serviceId}</h2>
//       {papers.map((paper) => (
//         <div key={paper.id}>
//           <p>{paper.document}</p>
//           {paper.status === 'uploaded' && (
//             <>
//               <button onClick={() => handleEdit(paper.id)}>Edit</button>
//               <button onClick={() => handleDelete(paper.id)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//       <div>
//         <input type="text" value={newPaper} onChange={(e) => setNewPaper(e.target.value)} />
//         <button onClick={handleUpload}>Upload Paper</button>
//       </div>
//     </div>
//   );
// };

// export default PapersPage;
