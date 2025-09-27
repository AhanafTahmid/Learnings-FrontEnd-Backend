import express from 'express';
import urlModel from '../model/shortUrl';

export const createURL = async (req: express.Request, res: express.Response) => { 
    const { fullUrl } = req.body;
    try {
        const newUrl = await urlModel.create({ fullUrl });
        res.status(201).json(newUrl);
    } catch (error) {
        res.status(500).json({ message: 'Error creating URL', error });
    }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const urls = await urlModel.find();
        if( urls.length === 0) {
             res.status(404).json({ message: 'No URLs found' });
        }
        else res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching URLs', error });
    }
}
export const getUrl = async (req: express.Request, res: express.Response) => {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });

    try{
    if (!shortUrl) {
        res.status(404).json({ message: 'URL not found' });
    }
    else{
        shortUrl.clicks++;
        shortUrl.save();
        res.status(200).json(shortUrl);
    }} 
    catch (error) {
        res.status(500).json({ message: 'Error fetching URL', error });
    }

}
export const deleteUrl = async (req: express.Request, res: express.Response) => {   
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });

    try{
    if (shortUrl) {
        res.status(200).json({ message: 'Deleted Requested URL' });
    }} 
    catch (error) {
        res.status(500).json({ message: 'Error fetching URL', error });
    }
    
}

