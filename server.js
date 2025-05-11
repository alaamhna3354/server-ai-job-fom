// server.js
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 3000

// 👇 هذا هو المهم
app.use(cors())
app.use(express.json())

app.post('/generate-ad', async (req, res) => {
  console.log(process.env.OPENROUTER_API_KEY);
  const { prompt } = req.body

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
