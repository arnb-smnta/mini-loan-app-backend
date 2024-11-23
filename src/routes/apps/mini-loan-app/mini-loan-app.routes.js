import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";
import {
  AdminApprovalForLoan,
  createLoanRequest,
  handleLoanRepayment,
  viewAllLoanofAParticularUser,
  viewAllunApprovedLoan,
  viewAlluserLoans,
  ViewLoan,
  viewRepaymentDetails,
} from "../../../controllers/apps/mini-loan-app/loan.controllers.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";
import { validate } from "../../../validators/validate.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createLoanRequest);

router
  .route("/approve/:loanId")
  .post(mongoIdPathVariableValidator("loanId"), validate, AdminApprovalForLoan);
router
  .route("/view/:loanId")
  .get(mongoIdPathVariableValidator("loanId"), validate, ViewLoan);
router
  .route("/repayment/:repaymentId")
  .post(
    mongoIdPathVariableValidator("repaymentId"),
    validate,
    handleLoanRepayment
  )
  .get(viewRepaymentDetails);

router.route("/viewLoans").get(viewAlluserLoans);
router.route("/viewUnapprovedLoans").get(viewAllunApprovedLoan);
router
  .route("/viewloansOfAUser/:userId")
  .get(
    mongoIdPathVariableValidator("userId"),
    validate,
    viewAllLoanofAParticularUser
  );
export default router;
