function synthetic(activity) {
    let syntheticActivity = activity.clone();
    syntheticActivity.prepareData();
    syntheticActivity.prepareFinalData();
    syntheticActivity.synthetic = true;

    return syntheticActivity;
}

export const activityApi = {
    synthetic
};