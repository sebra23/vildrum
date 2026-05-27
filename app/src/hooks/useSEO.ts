import { useEffect } from 'react'

export function useSEO(title: string, description: string) {
  useEffect(() => {
    // Set document title
    document.title = title

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'description'
      newMeta.content = description
      document.head.appendChild(newMeta)
    }
  }, [title, description])
}
