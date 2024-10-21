export const generateFigmaContent = async (
  input: File | string
): Promise<string> => {
  try {
    let imageUrl: string;

    if (input instanceof File) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(input);
      });
    } else {
      // For text input, we'll create a placeholder image
      imageUrl = `https://via.placeholder.com/300x200?text=${encodeURIComponent(input)}`;
    }

    return JSON.stringify(
      {
        type: 'FRAME',
        name: 'Generated Frame',
        children: [
          {
            type: 'IMAGE',
            name: 'Generated Image',
            sourceImage: imageUrl,
          },
          {
            type: 'TEXT',
            name: 'Description',
            characters:
              input instanceof File
                ? 'Uploaded image'
                : `Generated from prompt: ${input}`,
          },
        ],
      },
      null,
      2
    );
  } catch (error) {
    console.error('Error generating Figma content:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate Figma content: ${error.message}`);
    } else {
      throw new Error('Failed to generate Figma content: Unknown error');
    }
  }
};