from flask import jsonify
from langchain.llms import OpenAI
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

#importar resposta
from dialogFlow.Intents.df_respostas_formatadas.df_resposta_pap52_Formatada import formatar_resposta_para_card

def consulta_documento(pergunta):
    # Carregar documento
    loader = TextLoader('./documentos/ResumoPAP52.txt')
    documentos = loader.load()

    # Dividir o documento em pedaços
    texto_dividido = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    textos = texto_dividido.split_documents(documentos)

    # Criar nossos embeddings
    embeddings = OpenAIEmbeddings()
    documentosArmazenados = Chroma.from_documents(textos, embeddings, collection_name="ResumoPAP-52")

    # Usar o banco de dados de vetores que acabamos de criar
    llm = OpenAI(temperature=0)
    chain = RetrievalQA.from_chain_type(llm, retriever=documentosArmazenados.as_retriever(), verbose=True)

    # Obter e retornar a resposta
    resposta = chain.run(pergunta)
    print(f'Pergunta do usuário: {pergunta}. Resposta da I.A. {resposta}')
    print(f'Resposta formatada: {resposta_formatada}')
    resposta_formatada = formatar_resposta_para_card(resposta)
    return jsonify(resposta_formatada), 200
