import React, { useState } from "react";
import dayjs from "dayjs";
import AddConsultationDialog from "../../dialogs/AddConsultationDialog.jsx";
import axios from "../../../axiosConfig.js";
import { FaTrash, FaPlus } from "react-icons/fa";
import { highlightText } from "../../../../utils/textUtils.js";

export default function ConsultationList({
  consultations,
  onConsultationClick,
  patientId,
  onConsultationAdded,
  onConsultationDeleted,
}) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAddDialog = () => setShowAddDialog(true);
  const closeAddDialog = () => setShowAddDialog(false);

  const handleDelete = async (consultationId) => {
    try {
      await axios.delete(`/consultation/${consultationId}`);
      onConsultationDeleted(consultationId);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const formattedConsultations = consultations.map((consultation) => ({
    ...consultation,
    formattedDate: dayjs(consultation.date).format("DD/MM/YYYY"),
  }));

  const filteredConsultations = formattedConsultations.filter((consultation) =>
    consultation.formattedDate.includes(searchQuery)
  );

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">Consultations</h2>
      <button
        onClick={openAddDialog}
        className="flex items-center mb-4 bg-lime-600 text-white px-4 py-2 rounded w-full"
      >
        <FaPlus className="mr-2" /> Ajouter une consultation
      </button>
      <input
        type="text"
        placeholder="Rechercher une consultation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded border text-sm"
      />
      <ul>
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation) => (
            <li
              key={consultation.id}
              className="mb-4 cursor-pointer flex justify-between items-center border-b-2 border-stone-400"
            >
              <span
                onClick={() => onConsultationClick(consultation)}
                className="text-lime-600 hover:underline"
                dangerouslySetInnerHTML={{
                  __html: highlightText(
                    consultation.formattedDate,
                    searchQuery
                  ),
                }}
              />
              <button
                onClick={() => handleDelete(consultation.id)}
                className="text-red-500 px-2 py-1 rounded"
              >
                <FaTrash size={16} />
              </button>
            </li>
          ))
        ) : (
          <li>Aucune consultation enregistrée.</li>
        )}
      </ul>

      <AddConsultationDialog
        patientId={patientId}
        isVisible={showAddDialog}
        onClose={closeAddDialog}
        onConsultationAdded={onConsultationAdded}
      />
    </>
  );
}
