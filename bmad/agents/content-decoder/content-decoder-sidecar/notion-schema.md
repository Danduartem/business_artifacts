# Notion Database Schema Reference

## Complete Property List (14 fields)

### 1. Instagram (title)
**Type:** Title field
**Purpose:** Handle do perfil Instagram
**Example:** `@marketingbrasil`

### 2. Caption (rich_text)
**Type:** Rich Text
**Purpose:** Legenda completa do post
**Max length:** 2000 characters (Notion limit)

### 3. Categoria do Hook (multi_select)
**Type:** Multi-select
**Options:**
- Lacuna de Curiosidade
- Focado em Problema
- Dor Direta
- Promessa de Transformação
- Mostrar Resultados
- História Pessoal
- Pergunta Direta
- Declaração Controversa
- Desabafo Pessoal
- Aviso de Erro
- Loop Aberto
- Antes/Depois

**Select:** 1-3 most prominent categories

### 4. Data (date)
**Type:** Date
**Format:** YYYY-MM-DD
**Purpose:** Data de publicação do post

### 5. Duração do Vídeo (seg) (number)
**Type:** Number
**Purpose:** Duração do vídeo em segundos
**Note:** Only for video posts, leave empty for images/carousels

### 6. Estilo Visual (multi_select)
**Type:** Multi-select
**Options:**
- Polido/Profissional
- Cru/Autêntico
- Colorido
- Minimalista
- Muito Texto
- Cara na Câmera
- Só B-Roll
- Escuro/Sombrio
- Claro/Arejado
- Estética Brasileira

**Select:** 1-3 most prominent visual characteristics

### 7. Formato (select)
**Type:** Select (single choice)
**Options:**
- Reel
- Carrossel
- Imagem Única
- Reel - Falando na Câmera
- Reel - B-Roll
- Reel - Texto Sobreposto
- Infográfico
- Gráfico de Citação

### 8. Framework (select)
**Type:** Select (single choice)
**Options:**
- AIDA
- PAS
- BAB
- 4Ps
- PASTOR
- Como Fazer
- História
- Estudo de Caso
- Listicle
- Quebra de Mito
- Desabafo
- Pergunta-Resposta

### 9. Ponto de Dor (rich_text)
**Type:** Rich Text
**Purpose:** Pain point que o conteúdo aborda
**Example:** "Dificuldade em crescer organicamente no Instagram apesar de postar consistentemente"

### 10. Tipo de CTA (select)
**Type:** Select (single choice)
**Options:**
- Salve Isso
- Compartilhe/Marque
- Comente Abaixo
- Link na Bio
- Mande DM
- Assista Vídeo Completo
- Arraste
- Sem CTA Claro

### 11. Tom Emocional (multi_select)
**Type:** Multi-select
**Options:**
- Aspiracional
- Empático
- Urgente
- Educacional
- Divertido
- Vulnerável
- Empoderador
- Motivacional
- Frustrado/Desabafando
- Relacionável
- Autoritário

**Select:** 1-3 most prominent emotional tones

### 12. Título/Hook (rich_text)
**Type:** Rich Text
**Purpose:** Hook principal/título do conteúdo
**Example:** "3 erros que MATAM seu crescimento no Instagram"

### 13. Video Transcrito (rich_text)
**Type:** Rich Text
**Purpose:** Transcrição completa do vídeo
**Max length:** 2000 characters (Notion limit)
**Note:** Leave empty if no transcription available

### 14. URL (url)
**Type:** URL
**Purpose:** Link do post no Instagram
**Format:** `https://www.instagram.com/p/ABC123/`

## Notion JSON Format

```json
{
  "properties": {
    "Instagram": {
      "title": [
        {
          "text": {
            "content": "@handle"
          }
        }
      ]
    },
    "Caption": {
      "rich_text": [
        {
          "text": {
            "content": "Caption text..."
          }
        }
      ]
    },
    "Categoria do Hook": {
      "multi_select": [
        { "name": "Lacuna de Curiosidade" },
        { "name": "Promessa de Transformação" }
      ]
    },
    "Data": {
      "date": {
        "start": "2024-11-17"
      }
    },
    "Duração do Vídeo (seg)": {
      "number": 45
    },
    "Estilo Visual": {
      "multi_select": [
        { "name": "Cru/Autêntico" },
        { "name": "Cara na Câmera" }
      ]
    },
    "Formato": {
      "select": {
        "name": "Reel - Falando na Câmera"
      }
    },
    "Framework": {
      "select": {
        "name": "PAS"
      }
    },
    "Ponto de Dor": {
      "rich_text": [
        {
          "text": {
            "content": "Difficulty growing Instagram organically"
          }
        }
      ]
    },
    "Tipo de CTA": {
      "select": {
        "name": "Salve Isso"
      }
    },
    "Tom Emocional": {
      "multi_select": [
        { "name": "Empático" },
        { "name": "Educacional" }
      ]
    },
    "Título/Hook": {
      "rich_text": [
        {
          "text": {
            "content": "3 erros que matam seu crescimento"
          }
        }
      ]
    },
    "Video Transcrito": {
      "rich_text": [
        {
          "text": {
            "content": "Transcription text..."
          }
        }
      ]
    },
    "URL": {
      "url": "https://www.instagram.com/p/ABC123/"
    }
  }
}
```

## Validation Checklist

Before exporting to Notion, verify:

- [ ] All 14 properties are present
- [ ] Property names match EXACTLY (case-sensitive, including accents)
- [ ] Multi-select fields have 1-3 options selected
- [ ] Select fields have exactly 1 option selected
- [ ] All option names match allowed values exactly
- [ ] Date format is YYYY-MM-DD
- [ ] Number fields contain integers only
- [ ] URL is valid Instagram post link
- [ ] Rich text fields don't exceed 2000 characters
- [ ] Title field (Instagram) is not empty

## Common Errors

**validation_error: "Property X does not exist"**
- Check spelling and capitalization exactly
- Verify accents (á, ã, é, etc.)
- Ensure property exists in Notion database

**validation_error: "Invalid select option"**
- Option name must match Notion database exactly
- Check for typos in option names
- Verify option exists in database

**Empty required fields:**
- Instagram (title) is always required
- At least one of Caption OR Video Transcrito should have content
