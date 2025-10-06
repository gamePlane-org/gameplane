// routes/venueRoutes.js
import express from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import { 
    getAllVenues, 
    getVenueById, 
    createVenue, 
    updateVenue, 
    deleteVenue 
} from "../services/venueServices.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/venues", async (req, res) => {
  try { 
    const v = await getAllVenues(); 
    res.json({ 
        success: true, count: v.length, data: v }); 
}
  catch (err) { res.status(500).json({ 
    success: false, error: err.message }); 
}
});

router.get("/venues/:id", async (req, res) => {
  try {
     const v = await getVenueById(req.params.id); 
    res.json({ 
        success: true, data: v }); 
}
  catch (err) { res.status(404).json({ 
    success: false, error:
     err.message }); 
}
});

router.post("/venues", authorizeRole("ADMIN"), async (req, res) => {
  try { 
    const created = await createVenue(req.body); 
    res.status(201).json({ 
        success: true, data: created }); 
    }
  catch (err) { res.status(400).json({ 
    success: false, 
    error: err.message }); }
});

router.put("/venues/:id", authorizeRole("ADMIN"), async (req, res) => {
  try { 
    const updated = await updateVenue(req.params.id, req.body); 
    res.json({ success: true, 
        data: updated }); 
    }
  catch (err) { res.status(400).json({ 
    success: false, 
    error: err.message }); 
}
});

router.delete("/venues/:id", authorizeRole("ADMIN"), async (req, res) => {
  try { 
    const deleted = await deleteVenue(req.params.id); res.json({ 
    success: true, data: deleted }); 
}
  catch (err) { res.status(404).json({ 
    success: false, 
    error: err.message }); 
}
});

export default router;
