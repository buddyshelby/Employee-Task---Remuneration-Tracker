<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'employee_name',
        'task_description',
        'date',
        'hours_spent',
        'hourly_rate',
        'additional_charges',
    ];
    protected $primaryKey = 'task_id';
    public $incrementing = true;
    protected $keyType = 'int';
}