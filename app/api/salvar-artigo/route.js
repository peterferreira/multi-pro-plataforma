import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { title, date, description, body, imageBase64, imageName } = await request.json();

    // 1. Validar campos
    if (!title || !body) {
      return NextResponse.json({ error: 'Título e conteúdo são obrigatórios.' }, { status: 400 });
    }

    // Gerar slug simples para o arquivo
    const cleanTitle = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const fileDate = date || new Date().toISOString().split('T')[0];
    const filename = `${fileDate}-${cleanTitle}.md`;
    const blogFolder = path.join(process.cwd(), 'content', 'blog');
    
    // Garantir que a pasta do blog existe
    if (!fs.existsSync(blogFolder)) {
      fs.mkdirSync(blogFolder, { recursive: true });
    }

    let finalBody = body;

    // 2. Se houver imagem base64, salvar na pasta pública de mídia do blog
    if (imageBase64 && imageName) {
      const imagesFolder = path.join(process.cwd(), 'public', 'images', 'blog');
      if (!fs.existsSync(imagesFolder)) {
        fs.mkdirSync(imagesFolder, { recursive: true });
      }

      // Limpar o prefixo do base64 (e.g. data:image/png;base64,)
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Limpar nome do arquivo da imagem
      const cleanImgName = imageName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9.]+/g, '-');
        
      const imgPath = path.join(imagesFolder, cleanImgName);
      fs.writeFileSync(imgPath, buffer);

      // Adicionar a referência da imagem no corpo do Markdown
      const imgMarkdownRef = `\n\n![${title}](/images/blog/${cleanImgName})\n\n`;
      
      // Insere a referência de imagem logo após o frontmatter
      if (body.startsWith('---')) {
        const parts = body.split('---');
        if (parts.length >= 3) {
          parts[2] = imgMarkdownRef + parts[2];
          finalBody = parts.join('---');
        } else {
          finalBody = imgMarkdownRef + body;
        }
      } else {
        finalBody = imgMarkdownRef + body;
      }
    }

    // 3. Salvar arquivo markdown
    const filePath = path.join(blogFolder, filename);
    fs.writeFileSync(filePath, finalBody, 'utf-8');

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Erro ao salvar artigo:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
