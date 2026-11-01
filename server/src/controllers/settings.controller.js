const asyncHandler = require('../utils/asyncHandler');
const fail = require('../utils/httpError');
const price = require('../services/price.service');
const Setting = require('../models/Setting');
const ActivityLog = require('../models/ActivityLog');

const defaultCompanySettings = {
  supportPhone: '+919956355567',
  supportEmail: 'thepoojanvidhi@gmail.com',
  grievanceEmail: 'aditya.sahu2557@gmail.com',
  grievanceOfficer: 'Aditya Sahu',
  entityName: 'पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)'
};

// --- Price Endpoints ---
exports.getPrice = asyncHandler(async (req, res) => {
  res.json({ price: await price.getPrice() });
});

exports.setPrice = asyncHandler(async (req, res) => {
  const v = Number(req.body.price);
  if (!(v >= 1)) throw fail(400, 'Invalid price');
  const updated = await price.setPrice(v);
  res.json({ price: updated.value });
});

// --- Company Support & Grievance Settings ---
exports.getCompanySettings = asyncHandler(async (req, res) => {
  const doc = await Setting.findOne({ key: 'company_settings' });
  const settings = {
    ...defaultCompanySettings,
    ...(doc && typeof doc.value === 'object' ? doc.value : {})
  };
  res.json({ success: true, settings });
});

exports.setCompanySettings = asyncHandler(async (req, res) => {
  const currentDoc = await Setting.findOne({ key: 'company_settings' });
  const current = {
    ...defaultCompanySettings,
    ...(currentDoc && typeof currentDoc.value === 'object' ? currentDoc.value : {})
  };

  const {
    supportPhone,
    supportEmail,
    grievanceEmail,
    grievanceOfficer,
    entityName
  } = req.body;

  const updatedSettings = {
    supportPhone: supportPhone ? String(supportPhone).trim() : current.supportPhone,
    supportEmail: supportEmail ? String(supportEmail).trim().toLowerCase() : current.supportEmail,
    grievanceEmail: grievanceEmail ? String(grievanceEmail).trim().toLowerCase() : current.grievanceEmail,
    grievanceOfficer: grievanceOfficer ? String(grievanceOfficer).trim() : current.grievanceOfficer,
    entityName: entityName ? String(entityName).trim() : current.entityName
  };

  const doc = await Setting.findOneAndUpdate(
    { key: 'company_settings' },
    { value: updatedSettings },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Record Admin Audit Event
  try {
    await ActivityLog.create({
      userId: req.user?.id || 'admin',
      userEmail: req.user?.email || 'admin@poojanvidhi.com',
      action: 'SETTINGS_UPDATED',
      ipAddress: req.ip || req.connection?.remoteAddress || '127.0.0.1',
      userAgent: req.get('user-agent') || 'Server Admin Console',
      metaData: {
        previous: current,
        updated: updatedSettings
      }
    });
  } catch (logErr) {
    console.warn('Could not record settings update in activity log:', logErr.message);
  }

  res.json({
    success: true,
    message: 'Support and grievance contact details successfully updated',
    settings: doc.value
  });
});
