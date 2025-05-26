import { useEffect, useState } from 'react';
import { addPreset, deletePreset, getPresets } from '../API/productApi';

function usePreset(setInputValue, setPriceValue, setQuantityValue, setCategoryValue){
    const [presets, setPresets] = useState([]);
    const [presetSearch, setPresetSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    //Display presets
    useEffect(() => {
        getPresets().then(response => setPresets(response.data))
    }, []);

    //save preset
    const handleSavePreset = (item) => {
        addPreset(item.price, item.name, item.quantity, item.category)
        .then(response => {
          setPresets(prev => [...prev, response.data]);
        })
        .catch(err => console.error('Failed to save preset:', err));
    };

    //add new preset (not implemented)
    const handleAddPresetToList = (preset) => {
        setInputValue(preset.name);
        setPriceValue(preset.price ?? '');
        setQuantityValue(preset.quantity ?? '');
        setCategoryValue(preset.category ?? '');
        setShowDropdown(false);
    };

    //remove preset
    const handleRemovePreset = (id) => {
        deletePreset(id)
        .then(response => {
          setPresets(prev => prev.filter(p => p.id !== id))
        })
        .catch(err => console.error('Failed to remove preset:', err));
    };

    return {
        presets,
        presetSearch,
        setPresetSearch,
        showDropdown,
        setShowDropdown,
        handleSavePreset,
        handleAddPresetToList,
        handleRemovePreset
    }
}

export default usePreset;