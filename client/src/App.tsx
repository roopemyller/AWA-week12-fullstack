
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'

import './App.css'
import { useState } from 'react'


function App() {

  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')

  async function handleButton() {
      try{
        const response = await fetch('/api/books')
        const data = await response.json()
        console.log("Get data: ", data)
      } catch (error) {
        console.error('Error fetching:', error)
      }
    }

  const submitNewBook = async () => {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, author, pages }),
    })

    if(response.ok){
        const newBook = await response.json()
        console.log(newBook)
        setName('')
        setAuthor('')
        setPages('')
      }else{
        console.log("Error creating a book")
      }
  }

  return (
    <>
      <h1>books</h1>

      <button onClick={handleButton}> Get Books </button><br />

      <MuiCard variant='outlined'>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding:"50px 120px" }}>
                <Typography variant='h4'>
                    Create a book
                </Typography>

                <FormLabel>
                    Name
                </FormLabel>
                <TextField
                    required
                    fullWidth
                    id="name"
                    placeholder='Book Name'
                    variant='outlined'
                    onChange={e => setName(e.target.value)}
                />

                <FormLabel>
                    Author
                </FormLabel>
                <TextField
                    required
                    fullWidth
                    id="author"
                    type="author"
                    placeholder='Author name'
                    variant='outlined'
                    onChange={e => setAuthor(e.target.value)}
                />
                
                <FormLabel>
                    Pages
                </FormLabel>
                <TextField
                    required
                    fullWidth
                    id="pages"
                    type='pages'
                    placeholder='Number of pages'
                    variant='outlined'
                    onChange={e => setPages(e.target.value)}
                />
                <Button type='submit' variant='contained' onClick={submitNewBook}>Add Book</Button>
            </Box>
        </MuiCard>
    </>
  )
}

export default App
