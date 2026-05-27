#!/usr/bin/env node

/**
 * Triggers TinaCMS Cloud indexing before build
 * This ensures the remote schema is up-to-date with local changes
 */

const TINA_CLIENT_ID = process.env.TINA_PUBLIC_CLIENT_ID
const TINA_TOKEN = process.env.TINA_TOKEN
const BRANCH = process.env.GITHUB_BRANCH || 'main'

if (!TINA_CLIENT_ID || !TINA_TOKEN) {
  console.log('⚠️  TinaCMS credentials not found, skipping indexing trigger')
  process.exit(0)
}

async function triggerIndexing() {
  try {
    console.log('🔄 Triggering TinaCMS Cloud indexing...')
    
    const response = await fetch(
      `https://content.tinajs.io/index/${TINA_CLIENT_ID}/${BRANCH}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TINA_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.ok) {
      console.log('✅ Indexing triggered successfully')
      console.log('⏳ Waiting 10 seconds for indexing to complete...')
      await new Promise(resolve => setTimeout(resolve, 10000))
      console.log('✅ Ready to build')
    } else {
      const errorText = await response.text()
      console.log(`⚠️  Failed to trigger indexing: ${response.status} ${errorText}`)
      console.log('Continuing with build anyway...')
    }
  } catch (error) {
    console.log(`⚠️  Error triggering indexing: ${error.message}`)
    console.log('Continuing with build anyway...')
  }
}

await triggerIndexing()
