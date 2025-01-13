// src/pages/admin/mails/index.tsx (this page show all mails as well as delete it one by one)
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface Mail {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const MailsPage = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const res = await axios.get("/api/mails/get-mails");
        setMails(res.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/mails/delete-mail?id=${id}`);
      if (res.status === 200) {
        // Remove the deleted mail from the state to reflect the change
        setMails((prevMails) => prevMails.filter((mail) => mail._id !== id));
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: "768px" }}>
      <h1 className="text-3xl mb-4">All Mails</h1>
      {mails.length === 0 ? (
        <p className="text-center">No mails found</p>
      ) : (
        <div className="grid gap-4 grid-cols-1">
          {mails.map((mail) => (
            <div key={mail._id} className="bg-white border-gray-300 border-2 p-4 rounded-lg">
              <h2 className="text-lg font-bold pb-3 border-b-2">
                {mail.firstName} {mail.lastName}
              </h2>
              <p className="py-3 border-b-2"><strong>Sender Email:</strong> {mail.email}</p>
              <h3 className="text-lg font-bold p-3 bg-gray-200">{mail.subject}</h3>
              <p className="py-3">{mail.message}</p>
              <div className="flex justify-between text-gray-600">
                <p>Send At: {new Date(mail.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right mt-4  p-3 bg-gray-200">
                <button
                  onClick={() => handleDelete(mail._id)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailsPage;
