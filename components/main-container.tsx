"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';
export const MainContainer = () => {

    const [image ,setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [relatedQuestion ,setRelatedQuestion] =useState<string[]>([])

    const identifyImage = async (additionalPrompt: string = "") => {
        if(!image) return;

        setLoading(true);

        const genAI =new GoogleGenerativeAI(
            process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
        );

        const model =genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        try {
            const imageParts = await fileToGenerativePart(image);
            const result = await model.generateContent([
                `Identify this image and provide its name and important information, including a brief explanation about that image. ${additionalPrompt}`,
                imageParts,
            ]);

            const response = await result.response;
            const text = response
                .text()
                .trim()
                .replace(/'''/g,"")
                .replace(/\*\*/g,"")
                .replace(/\*/g,"")
                .replace(/-\s*/g,"")
                .replace(/\n\s*\n/g, "\n");
            setResult(text);
            generateKeywords(text);
            await generateRelatedQuestions(text)

        } catch (error) {
            console.log((error as Error)?.message);
        }finally{
            setLoading(false)
        }
        
    };

    const fileToGenerativePart = async (file : File) : Promise<{
        inlineData : {data : string; mimeType : string};
    }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result as string;
                const base64Content = base64Data.split(",")[1]
                resolve({
                    inlineData : {
                        data: base64Content,
                        mimeType: file.type,
                    },
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const generateKeywords = (text:string) => {
        const words = text.split(/\s+/)
        const keywordsSet = new Set<string>();

        words.forEach ( word => {
            if (words.length > 4 && !["this", "that", "with", "from", "have" ,"is" ,"a" ,"are" ,"was" ,"the" ,"of" ,"what" ,"which" ,"for" ,"at","an"].
                includes(word.toLowerCase())){
                    keywordsSet.add(word);
                }
        });
        setKeywords(Array.from(keywordsSet).slice(0,5));
    };

    const regenerateContent= (Keyword : string) => {
        identifyImage(`Focus more on aspects related to this "${Keyword}".`,)
    };

    const generateRelatedQuestions = async(text : string) => {
        const genAI =new GoogleGenerativeAI(
            process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
        );

        const model =genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        try {
            const result = await model.generateContent([
                `Based on the following information about an image, generate 5 related questions that someone might ask to learn more about the subject: ${text} Format the output as a simple list of questions, one per line`,
            ]);
            const response = await result.response
            const questions = response.text().trim().split("\n")
            setRelatedQuestion(questions);
        } catch (error) {
            console.log((error as Error)?.message);     
            setRelatedQuestion([])    
        }
    };

    const askRelatedQuestion = (question : string) => {
        identifyImage(`Answer the following question about the image :  "${question}".`,)
    }

    return(
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='bg-white rounded-lg shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>
                    Identify Your Image
                </h2>
                <div className='mb-8'>
                    <label htmlFor='image-upload' className='block text-sm font-medium text-gray-700 mb-2'>
                        Upload an Image
                    </label>
                    <input type='file' id="image-upload" accept="image/*" onChange={handleImageUpload} className='block w-full text-sm to-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 ease-in-out file:cursor-pointer' />
                </div>
                {/* display the image */}
                { image && (
                  <div className='mb-8 flex justify-center'>
                    <Image
                       src={URL.createObjectURL(image)}
                       alt="uploaded img"
                       width={300}
                       height={300}
                       className='rounded-lg shadow-md'
                    />                    
                 </div>
                )}

                <button 
                type='button'
                onClick={() => identifyImage()}
                disabled={!image || loading} className='w-full bg-blue-600 text-blue-100 py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg'>
                    { loading ? "Identifying..." : "Identify Image"}
                </button>
            </div>

            {result && (
                <div className='bg-blue-50 p-8 border-t border-blue-100'>
                    <h3 className='text-2xl font-bold text-blue-800 mb-4'>Image Information</h3>
                    <div className='max-w-none'>
                    {result.split("\n").map((line, index) => {
    if (line.startsWith("Important Information:") || line.startsWith("Other Information:")) {
        return (
            <h4 key={index} className="text-xl font-semibold mt-4 mb-2 text-blue-700">
                {line}
            </h4>
        );
    } else if (line.match(/^\d+\./) || line.startsWith("-")) {
        return (
            <li key={index} className="ml-4 mb-2 text-gray-700">
                {line}
            </li>
        );
    } else if (line.trim() !== "") {
        return (
            <p key={index} className="mb-2 text-gray-800">
                {line}
            </p>
        );
    }
    return null;
})}
                    </div>

                    <div className='mt-6'>
                        <h4 className='text-lg font-semibold mb-2 text-blue-700'>Related Keywords</h4>
                        <div className='flex flex-wrap gap-2'>
                        {keywords.map((keyword, index) => (
    <button 
        key={index}
        type="button" 
        onClick={() => regenerateContent(keyword)} 
        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 trasnsition duration-150 ease-in-out">
        {keyword}
    </button>
))}
                        </div>
                    </div>

                    {relatedQuestion.length > 0 && (
                        <div className='mt-6'>
                            <h4 className='text-lg font-semibold mb-2 text-blue-700'>Related Questions</h4>
                            <ul className='space-y-2'>
                            {relatedQuestion.map((question, index) => (
  <button 
    key={index} // Add key prop here
    type='button' 
    onClick={() => askRelatedQuestion(question)} 
    className='text-left w-full bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-300 transition duration-150 ease-in-out'>
    {question}
  </button>
))}

                            </ul>
                        </div>
                    ) }
                </div>
            )}
        </div>
        <section id="how-it-works" className='mt-16'>
            <h2 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>
                How It Works
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
    { title: "Upload Image", description: "Start by uploading an image in any of the supported formats. Make sure the file size is within the limits." },
    { title: "AI Analysis", description: "Our advanced AI will analyze the uploaded image and extract detailed information about its contents." },
    { title: "Get Results", description: "Once the analysis is complete, you will receive the results with a breakdown of the image's contents." }
].map((step, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-6 transition duration-150 ease-in-out hover:scale-105 cursor-pointer">
        <div className="text-3xl font-semibold text-blue-600 mb-4"></div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
    </div>
))}

            </div>
        </section>

        <section id="features" className='mt-16'>
    <h2 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>
        Features
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
    {[
    { title: "Accurate Identification", description: "Our AI system provides precise and reliable image identification, ensuring you get accurate results every time." },
    { title: "Detailed Information", description: "Receive in-depth analysis with detailed information about every aspect of your uploaded image." },
    { title: "Fast Results", description: "Enjoy quick processing and get your image analysis results in a matter of seconds, saving you time." },
    { title: "User Friendly Interface", description: "Navigate through our intuitive and user-friendly interface with ease, making the experience seamless." }
].map((feature, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-6 transition duration-150 ease-in-out hover:scale-105 cursor-pointer">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
    </div>
))}

    </div>
</section>

    </main>
    );
};


