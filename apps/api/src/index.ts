import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const app = new Hono()
app.use('/api/*', cors())

// D1
/**
 * 查詢資料表內所有資料
 */
app.get('/api/d1/:slug', async (c) => {
  const slug = c.req.param('slug')
  const { results } = await c.env.DATABASE.prepare(`SELECT * FROM ${slug};`).all()
  return c.json(results)
})

/**
 * 新增資料至資料表
 */
app.post('/api/d1/:slug', async (c) => {
  const params = await c.req.json()
  const keys = Object.keys(params)
  const values = Object.values(params)

  const keysString = `(${keys.join(', ')})`
  const valuesString = `(${values.map((value) => JSON.stringify(value)).join(', ')})`

  const { success } = await c.env.DATABASE.prepare(`insert into comments ${keysString} values ${valuesString}`).run()

  if (success) {
    c.status(201)
    return c.text(`Success:\n${keysString}\n${valuesString}`)
  } else {
    c.status(500)
    return c.text(`Error:\n${keysString}\n${valuesString}`)
  }
})

// R2
const connectR2 = (env) => {
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY
    }
  })
  return client
}

/**
 * 查詢儲存空間內所有檔案
 */
app.get('/api/r2/fetch', async (c) => {
  const client = connectR2(c.env)

  const command = new ListObjectsV2Command({
    Bucket: c.env.R2_BUCKET_NAME,
    MaxKeys: 1
  })

  let isTruncated = true
  const contents = []

  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await client.send(command)
    const contentsList = Contents.map((d) => d.Key)
    contents.push(...contentsList)
    isTruncated = IsTruncated
    command.input.ContinuationToken = NextContinuationToken
  }
  return c.json(contents)
})

// error
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text(err.toString())
})

app.notFound((c) => c.text('Not found', 404))

export default app
