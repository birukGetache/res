import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Button, ItemContainer, Input, Textarea, Image, Buttonx, Delete } from './AdminStyle';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Modal from 'react-modal'; 
import { useForm } from 'react-hook-form'; 

// Set the app element for accessibility
Modal.setAppElement('#root');

const Admin = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5176/api/items');
        setItems(response.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChange = (index, field, value) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      if (field === 'Price' || field === 'Rate') {
        updatedItems[index][field] = parseFloat(value); // Convert to number
      } else {
        updatedItems[index][field] = value;
      }
      return updatedItems;
    });
  };
  

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange(index, 'ImagePath', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (index, id) => {
    const currentItem = items[index];
    try {
      await axios.put(`http://localhost:5176/api/items/${id}`, currentItem);
      toast.success('Changes saved successfully!');
    } catch (error) {
      console.error("Error saving data: ", error);
      toast.error('Failed to save changes.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5176/api/items/${id}`);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error("Error deleting item: ", error);
      toast.error('Failed to delete item.');
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Image', data.Image[0]);
    formData.append('Name', data.Name);
    formData.append('Type', data.Type);
    formData.append('Price', parseFloat(data.Price)); // Convert to number
    formData.append('Rate', parseFloat(data.Rate));   // Convert to number
    formData.append('detail', data.detail);
    
    try {
      const response = await axios.post('http://localhost:5176/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setItems(prevItems => [...prevItems, response.data]);
      reset();
      setModalIsOpen(false);
      toast.success('Item added successfully!');
    } catch (error) {
      console.error("Error adding item: ", error);
      toast.error('Failed to add item.');
    }
  };
  

  return (
    <>
      <Header>Admin Panel</Header>
      <Button onClick={() => setModalIsOpen(true)} style={{ float: 'right' }}>Add Item</Button>

      <Container>
        {items.map((item, index) => (
          <ItemContainer key={index}>
            <Header as="h2">{item.Name}</Header>
            <Image src={item.ImagePath} alt={item.Name} />
            <input 
              type="file" 
              onChange={(e) => handleImageUpload(index, e)} 
            />
            <div>
              <label>Type:</label>
              <Input
                type="text"
                value={item.Type}
                onChange={(e) => handleChange(index, 'Type', e.target.value)}
              />
            </div>
            <div>
              <label>Name:</label>
              <Input
                type="text"
                value={item.Name}
                onChange={(e) => handleChange(index, 'Name', e.target.value)}
              />
            </div>
            <div>
              <label>Price:</label>
              <Input
                type="number"
                value={item.Price}
                onChange={(e) => handleChange(index, 'Price', e.target.value)}
              />
            </div>
            <div>
              <label>Rate:</label>
              <Input
                type="number"
                step="0.1"
                value={item.Rate}
                onChange={(e) => handleChange(index, 'Rate', e.target.value)}
              />
            </div>
            <div>
              <label>Detail:</label>
              <Textarea
                value={item.detail}
                onChange={(e) => handleChange(index, 'detail', e.target.value)}
                rows="4"
              />
            </div>
            <Delete onClick={() => handleDelete(item.id)}></Delete>
            <Button onClick={() => handleSave(index, item.id)}>Save</Button>
          </ItemContainer>
        ))}
      </Container>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add New Item"
        style={{ 
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', right: 'auto', bottom: 'auto' } 
        }}
      >
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <Input type="text" {...register('Name', { required: true })} />
          {errors.Name && <span style={{ color: 'red' }}>This field is required</span>}
          
          <label>Type:</label>
          <Input type="text" {...register('Type', { required: true })} />
          {errors.Type && <span style={{ color: 'red' }}>This field is required</span>}
          
          <label>Price:</label>
          <Input type="number" {...register('Price', { required: true, valueAsNumber: true })} />
          {errors.Price && <span style={{ color: 'red' }}>This field is required</span>}
          
          <label>Rate:</label>
          <Input type="number" step="0.1" {...register('Rate', { required: true, valueAsNumber: true })} />
          {errors.Rate && <span style={{ color: 'red' }}>This field is required</span>}
          
          <label>Detail:</label>
          <Textarea {...register('detail', { required: true })} />
          {errors.detail && <span style={{ color: 'red' }}>This field is required</span>}

          <label>Image:</label>
          <Input type="file" {...register('Image', { required: true })} accept="image/*" />
          {errors.Image && <span style={{ color: 'sred' }}>This field is required</span>}
          
          <Button type="submit">Add Item</Button>
          <Buttonx type="button" onClick={() => setModalIsOpen(false)}>Close</Buttonx>
        </form>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default Admin;
