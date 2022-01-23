import { memo, useState } from 'react';
import { Input, SubmitButton } from '../form';

function ProjectSearch({ handleSubmit }) {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(search);
    }

    return (
        <form onSubmit={submit} className='form'>
            <Input
                type='text'
                name='search'
                placeholder='Pesquise pelo item desejado...'
                handleOnChange={handleChange}
                value={search || ''}
            />

            <SubmitButton text='Pesquisar' />
        </form>
    )
}

export default memo(ProjectSearch);