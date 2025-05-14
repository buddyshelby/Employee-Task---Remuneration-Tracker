<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grouped = Task::all();
        return response()->json($grouped);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string',
            'task_description' => 'required|string',
            'date' => 'required|date_format:Y-m-d',
            'hours_spent' => 'required|numeric',
            'hourly_rate' => 'required|numeric',
            'additional_charges' => 'required|numeric'
        ]);

        $result = Task::create($validated);
        return response()->json($result);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = Task::findOrFail($id);
        $validated = $request->validate([
            'employee_name' => 'required|string',
            'task_description' => 'required|string',
            'date' => 'required|date_format:Y-m-d',
            'hours_spent' => 'required|numeric',
            'hourly_rate' => 'required|numeric',
            'additional_charges' => 'required|numeric'
        ]);
        $task->update($validated);
        return response()->json($task, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}