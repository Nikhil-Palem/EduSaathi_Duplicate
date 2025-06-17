import {College} from "../models/college.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {user} from "./user.controller.js";
// Create a new college

const newCollege = asyncHandler(async (req, res) => {
    const input = req.body;
    const college = await College.create({
        name: input.collegeName,
        collegeLogo: input.collegeLogo,
        address: input.address,
        email: input.email,
        phoneNumber: input.phoneNumber,
    })
    return res.status(200).json(new ApiResponse(200, college, "College added successfully"))
})

// Get all colleges

const allColleges = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, await College.find(), "All colleges"))
})

const findCollege = asyncHandler(async (req, res) => {
    let input = req.body;
    const results = await College.aggregate([{
        $search:{
            text:{
                "query": input.name,
                "path": "name"
            }
        }
    }])
    console.log(results)
    return res.status(200).json(new ApiResponse(200, results))
})
/*


app.get('/api/colleges', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific college by ID
app.get('/api/colleges/:id', async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a college by ID
app.put('/api/colleges/:id', async (req, res) => {
    try {
        const updatedCollege = await College.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCollege) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.json(updatedCollege);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a college by ID
app.delete('/api/colleges/:id', async (req, res) => {
    try {
        const deletedCollege = await College.findByIdAndDelete(req.params.id);
        if (!deletedCollege) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

export {newCollege, allColleges, findCollege}