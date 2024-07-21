import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Modal, Portal, TextInput, Text} from 'react-native-paper';
import {Dropdown} from 'react-native-paper-dropdown';

interface AddItemProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const OPTIONS = [
  {label: 'Breakfast', value: 'breakfast'},
  {label: 'Lunch', value: 'lunch'},
  {label: 'Snacks', value: 'snacks'},
];

const AddItem = ({openModal, setOpenModal}: AddItemProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('breakfast');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, description, category]);

  const validateForm = () => {
    let errors: any = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required.';
    }

    // Validate description field
    if (!description) {
      errors.description = 'Description is required.';
    }

    // Validate category field
    if (!category) {
      errors.category = 'category is required.';
    } else if (category.length < 3) {
      errors.category = 'category must be at least 3 characters.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      try {
        const res = await fetch(
          'https://cafeteria-connect-backend.onrender.com/api/signup',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, description, category}),
          },
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      // Form is invalid, display error messages
      console.error('Form has errors. Please correct them.');
    }
  };

  const handleUpload = () => {
    // upload item image
  };

  return (
    <Portal>
      <Modal
        visible={openModal}
        onDismiss={() => setOpenModal(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          margin: 5,
        }}>
        <View className="bg-white space-y-4">
          <Text variant="titleLarge" className="text-center">
            Add Item
          </Text>
          <View className="space-y-4">
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              error={!!errors.name}
            />
            {errors.name && <Text>{errors.name}</Text>}
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              error={!!errors.description}
            />
            {errors.description && <Text>{errors.description}</Text>}
            <View>
              <Dropdown
                label="Category"
                placeholder="Select Category"
                options={OPTIONS}
                value={category}
                onSelect={setCategory}
              />
            </View>
            {errors.category && <Text>{errors.category}</Text>}
            <Button mode="contained" onPress={handleUpload}>
              Upload Image
            </Button>
          </View>
          <View>
            <Button
              mode="contained"
              disabled={!isFormValid}
              onPress={handleSubmit}>
              ADD
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddItem;
